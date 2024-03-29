import { NextRequest } from "next/server";
import { updateSession, getSession } from "./authLib";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}
