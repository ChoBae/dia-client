import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pkValue = searchParams.get("pkValue");
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/interview/practice/histories/${pkValue}`,
    {
      headers: request.headers as HeadersInit,
      next: {
        revalidate: 0,
      },
    }
  );
  const data = await result.json();
  try {
    if (data.status === 200) {
      return NextResponse.json(data.data, { status: result.status });
    }
    return NextResponse.json(
      {
        message: "DB에서 에러를 리턴",
        error: result.statusText,
      },
      { status: result.status }
    );
  } catch (e) {
    return NextResponse.json({ error: "서버내부오류 발생" }, { status: 500 });
  }
}