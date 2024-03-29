import { NextRequest, NextResponse, userAgent } from "next/server";
import { updateSession, getSession } from "./authLib";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const session = await getSession();
  // console.log('session', session.accessToken);
  requestHeaders.set("user-agent", userAgent(request).ua);
  if (session) {
    requestHeaders.set("authorization", session.accessToken);
  }
  // console.log("requestHeaders", requestHeaders);
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });
  return response;
  // return await updateSession(request);
}

export const config = {
  matcher: "/:path*",
};
