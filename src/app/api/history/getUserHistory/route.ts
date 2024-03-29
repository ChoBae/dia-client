import { NextResponse } from "next/server";
export async function GET(request: Request) {

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/interview/practice/histories`,
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
      return NextResponse.json(data.data.scrollData, { status: result.status });
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

export async function POST() {
  // const res = await fetch("https://data.mongodb-api.com/...", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "API-Key": process.env.DATA_API_KEY!,
  //   },
  //   body: JSON.stringify({ time: new Date().toISOString() }),
  // });
  // const data = await res.json();
  // return Response.json(data);
}
