import { NextRequest, NextResponse } from 'next/server';

import { toPublicGuest } from '@/lib/invite-list.server';
import { getGuestFromSession, SESSION_COOKIE_NAME } from '@/lib/session';

export async function GET(request: NextRequest) {
  const sessionValue = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const guest = getGuestFromSession(sessionValue);

  if (!guest) {
    return NextResponse.json({ error: 'No active session.' }, { status: 401 });
  }

  return NextResponse.json({ guest: toPublicGuest(guest) });
}
