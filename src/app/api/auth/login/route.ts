import { NextRequest, NextResponse } from 'next/server';

import { findGuestByCode, toPublicGuest } from '@/lib/invite-list.server';
import { createSessionValue, SESSION_COOKIE_NAME, SESSION_MAX_AGE } from '@/lib/session';

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { code?: string } | null;
  const code = body?.code?.trim();

  if (!code || code.length < 8 || code.length > 32) {
    return NextResponse.json(
      { error: 'Please enter the invitation code exactly as it appears on your card.' },
      { status: 400 }
    );
  }

  const guest = findGuestByCode(code);
  if (!guest) {
    return NextResponse.json(
      {
        error: 'That invitation code could not be verified. Please check your card and try again.',
      },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ guest: toPublicGuest(guest) });
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: createSessionValue(guest.code),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });

  return response;
}
