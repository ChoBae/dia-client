import { NextResponse } from 'next/server';
// import { authOptions } from '../../auth/authOptions';
import { Session } from '@/types/Session';
import { logout } from '../../../../../authLib';
import { cookies } from "next/headers";
export async function DELETE() {
  cookies().set("session", "", { expires: new Date(0) });
  
  return NextResponse.json({ message: 'delete done' })
}
