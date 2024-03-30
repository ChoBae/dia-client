import { NextRequest, NextResponse, userAgent } from "next/server";

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("user-agent", userAgent(request).ua);
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
