import 'server-only';

import { put, list } from '@vercel/blob';

export interface RSVPEntry {
  guestCode: string;
  fullName: string;
  email: string;
  phone: string;
  attending: 'yes' | 'no';
  guestCount: number;
  guestNames: string;
  dietary: string;
  needsAccommodation: boolean;
  accommodationType: string;
  message: string;
  submittedAt: string;
}

const BLOB_PREFIX = 'rsvps/';

export async function saveRSVP(entry: RSVPEntry): Promise<void> {
  const filename = `${BLOB_PREFIX}${entry.guestCode}.json`;
  await put(filename, JSON.stringify(entry, null, 2), {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'application/json',
  });
}

export async function getRSVP(guestCode: string): Promise<RSVPEntry | null> {
  try {
    const { blobs } = await list({ prefix: `${BLOB_PREFIX}${guestCode}.json` });
    if (blobs.length === 0) return null;
    const response = await fetch(blobs[0].url);
    if (!response.ok) return null;
    return (await response.json()) as RSVPEntry;
  } catch {
    return null;
  }
}

export async function getAllRSVPs(): Promise<RSVPEntry[]> {
  try {
    const { blobs } = await list({ prefix: BLOB_PREFIX });
    const entries: RSVPEntry[] = [];
    for (const blob of blobs) {
      try {
        const response = await fetch(blob.url);
        if (response.ok) {
          entries.push((await response.json()) as RSVPEntry);
        }
      } catch {
        // skip corrupted entries
      }
    }
    return entries;
  } catch {
    return [];
  }
}
