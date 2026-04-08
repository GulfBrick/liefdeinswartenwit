import { NextRequest, NextResponse } from 'next/server';

import { getGuestFromSession, SESSION_COOKIE_NAME } from '@/lib/session';
import { saveRSVP, getRSVP, type RSVPEntry } from '@/lib/rsvp-store.server';

export async function POST(request: NextRequest) {
  const cookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const guest = getGuestFromSession(cookie);

  if (!guest) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || !body.attending || !body.fullName || !body.email) {
    return NextResponse.json(
      { error: 'Missing required fields: fullName, email, attending' },
      { status: 400 }
    );
  }

  const guestCode = guest.code;

  const entry: RSVPEntry = {
    guestCode,
    fullName: String(body.fullName).trim(),
    email: String(body.email).trim(),
    phone: String(body.phone || '').trim(),
    attending: body.attending === 'yes' ? 'yes' : 'no',
    guestCount: Math.min(Math.max(1, parseInt(body.guestCount) || 1), guest.maxGuests),
    guestNames: String(body.guestNames || '').trim(),
    dietary: String(body.dietary || '').trim(),
    needsAccommodation: body.needsAccommodation === 'yes',
    accommodationType: String(body.accommodationType || '').trim(),
    message: String(body.message || '').trim(),
    submittedAt: new Date().toISOString(),
  };

  try {
    await saveRSVP(entry);
    return NextResponse.json({ success: true, entry });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Failed to save RSVP:', message);
    return NextResponse.json(
      { error: 'Failed to save your RSVP. Please try again.', detail: message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const guest = getGuestFromSession(cookie);

  if (!guest) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const rsvp = await getRSVP(guest.code);
    return NextResponse.json({ rsvp });
  } catch {
    return NextResponse.json({ rsvp: null });
  }
}
