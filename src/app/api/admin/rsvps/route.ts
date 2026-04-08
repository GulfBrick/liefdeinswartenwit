import { NextRequest, NextResponse } from 'next/server';

import { getAllRSVPs } from '@/lib/rsvp-store.server';

const ADMIN_CODE = '1234';

function isAuthorised(request: NextRequest): boolean {
  const headerCode = request.headers.get('x-admin-code');
  if (headerCode === ADMIN_CODE) return true;

  const urlCode = request.nextUrl.searchParams.get('code');
  if (urlCode === ADMIN_CODE) return true;

  return false;
}

export async function GET(request: NextRequest) {
  if (!isAuthorised(request)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  try {
    const rsvps = await getAllRSVPs();

    const attending = rsvps.filter((r) => r.attending === 'yes');
    const notAttending = rsvps.filter((r) => r.attending === 'no');
    const totalGuests = attending.reduce((sum, r) => sum + (r.guestCount || 0), 0);
    const accommodationRequests = rsvps.filter((r) => r.needsAccommodation).length;

    const stats = {
      totalResponses: rsvps.length,
      attendingCount: attending.length,
      notAttendingCount: notAttending.length,
      totalGuests,
      accommodationRequests,
    };

    return NextResponse.json({ rsvps, stats });
  } catch (error) {
    console.error('Failed to fetch RSVPs:', error);
    return NextResponse.json({ error: 'Failed to fetch RSVPs' }, { status: 500 });
  }
}
