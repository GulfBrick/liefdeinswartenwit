import 'server-only';

import { put, list, get } from '@vercel/blob';

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
    access: 'private',
    addRandomSuffix: false,
    contentType: 'application/json',
  });
}

export async function getRSVP(guestCode: string): Promise<RSVPEntry | null> {
  try {
    const { blobs } = await list({ prefix: `${BLOB_PREFIX}${guestCode}.json` });
    if (blobs.length === 0) return null;
    const blob = await get(blobs[0].url);
    if (!blob) return null;
    const text = await blob.text();
    return JSON.parse(text) as RSVPEntry;
  } catch {
    return null;
  }
}

export async function getAllRSVPs(): Promise<RSVPEntry[]> {
  try {
    const { blobs } = await list({ prefix: BLOB_PREFIX });
    const entries: RSVPEntry[] = [];
    for (const item of blobs) {
      try {
        const blob = await get(item.url);
        if (blob) {
          const text = await blob.text();
          entries.push(JSON.parse(text) as RSVPEntry);
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
