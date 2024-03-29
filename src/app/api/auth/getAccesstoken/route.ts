import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Session } from "@/types/Session";
import { getSession } from "../../../../../authLib";
import { userAgent } from "next/server";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const userAgentString = request.headers.get("user-agent");
  // console.log("userAgentString", userAgentString);
  // console.log("이렇게 변경중", code, request.headers.get("user-agent"));
  if (!code) {
    throw new Error("code is required");
  }

  const apiUrl = `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/v0/auth/oauth/github`;
  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "user-agent": userAgentString as string,
    },
    body: JSON.stringify({ code: code }),
  };
  const result = await fetch(apiUrl, requestOptions);
  const data = await result.json();
  console.log("data", data);
  return NextResponse.json(data.data, { status: result.status });
  //   return NextResponse.json({ data });
  // try {
  //   if (data) {
  //     return NextResponse.json(data.data.pageData, { status: 200 });
  //   }
  //   return NextResponse.json(
  //     {
  //       message: 'DB에서 에러를 리턴',
  //       error: 'DB에서 에러를 리턴',
  //     },
  //     { status: 500 }
  //   );
  // } catch (e) {
  //   return NextResponse.json({ error: '서버내부오류 발생' }, { status: 500 });
  // }
}
