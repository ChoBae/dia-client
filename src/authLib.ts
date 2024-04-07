import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse, userAgent } from "next/server";
import { getUser } from "@/app/api/getUser";
import { mapExpiresAt } from "../lib/adapter/pgAdapter";
import { headers } from "next/headers";

const secretKey = process.env.NEXT_PUBLIC_SECRETKEY;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(accessToken: string) {
  const headersList = headers();
  const userAgentString = headersList.get("user-agent");

  const user = await getUser(accessToken, {
    "Content-Type": "application/json",
    "user-agent": userAgentString as string,
  });
  // Create the session
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  const expires = new Date(Date.now() + oneWeek);
  const session = await encrypt({ user, expires, accessToken });
  // Save the session in a cookie
  cookies().set("session", session, { expires, httpOnly: true });
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  parsed.expires = new Date(Date.now() + oneWeek);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
