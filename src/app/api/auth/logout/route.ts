import { NextResponse } from 'next/server';

import { SESSION_COOKIE_NAME } from '@/lib/session';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: '',
    expires: new Date(0),
    path: '/',
  });
  return response;
}
