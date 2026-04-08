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
const BLOB_ACCESS = { access: 'private' as const };

async function readBlob(url: string): Promise<RSVPEntry | null> {
  const result = await get(url, BLOB_ACCESS);
  if (!result || result.statusCode !== 200) return null;
  const response = new Response(result.stream);
  return (await response.json()) as RSVPEntry;
}

export async function saveRSVP(entry: RSVPEntry) {
  const filename = `${BLOB_PREFIX}${entry.guestCode}.json`;
  await put(filename, JSON.stringify(entry, null, 2), {
    ...BLOB_ACCESS,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
  });
}

export async function getRSVP(guestCode: string): Promise<RSVPEntry | null> {
  try {
    const { blobs } = await list({ prefix: `${BLOB_PREFIX}${guestCode}.json` });
    if (blobs.length === 0) return null;
    return await readBlob(blobs[0].url);
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
        const entry = await readBlob(item.url);
        if (entry) entries.push(entry);
      } catch {
        // skip corrupted entries
      }
    }
    return entries;
  } catch {
    return [];
  }
}
