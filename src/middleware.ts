import { NextRequest, NextResponse, userAgent } from "next/server";

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("user-agent", userAgent(request).ua);
  // add the CORS headers to the response
  requestHeaders.append("Access-Control-Allow-Credentials", "true");
  requestHeaders.append("Access-Control-Allow-Origin", "*"); // replace this your actual origin
  requestHeaders.append(
    "Access-Control-Allow-Methods",
    "GET,DELETE,PATCH,POST,PUT"
  );
  requestHeaders.append(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

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
