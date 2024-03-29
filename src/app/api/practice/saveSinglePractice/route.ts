import { NextResponse } from "next/server";
import { headers } from "next/headers";
export async function POST(request: Request) {
  const headersList = headers();
  const body = await request.json();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}api/v0/interview/practice/histories`,
      {
        headers: headersList as HeadersInit,
        next: {
          revalidate: 0,
        },
      }
    );
    if (!res.ok) {
      return NextResponse.json(
        {
          message: "DB에서 에러를 리턴",
          error: res.statusText,
        },
        { status: res.status }
      );

    }
  } catch (e) {
    return NextResponse.json({ error: "서버내부오류 발생" }, { status: 500 });
  }
}
