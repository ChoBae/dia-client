import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { Session } from '@/types/Session';
import { getSession } from '../../../../../authLib';
export async function GET(request: Request) {
  const session = await getSession();
  //   return NextResponse.json({ data });
  return NextResponse.json({ session });
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

