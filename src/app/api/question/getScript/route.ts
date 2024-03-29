import { NextResponse } from "next/server";
import { getSession } from "../../../../../authLib";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pkValue = searchParams.get("pkValue");
  const session = await getSession();
  const headers = session
    ? {
        'Content-Type': 'application/json',
        authorization: session.accessToken,
      }
    : {
        'Content-Type': 'application/json',
      };

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/interview/scripts?questionPkValue=${pkValue}`,
    {
      //   method: 'GET',
      headers: headers as HeadersInit,
      next: {
        revalidate: 0,
      },
    }
  );
  const data = await result.json();
  console.log('여기사람있어요',data);
  //   return data
  //   return NextResponse.json({ data });
  try {
    if (data.status === 200) {
      return NextResponse.json(data.data, { status: result.status });
    }
    return NextResponse.json(
      {
        message: 'DB에서 에러를 리턴',
        error: result.statusText,
      },
      { status: result.status }
    );
  } catch (e) {
    return NextResponse.json({ error: '서버내부오류 발생' }, { status: 500 });
  }
}
