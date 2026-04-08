import 'server-only';

import type { Guest, PublicGuest } from '@/lib/auth';

export const guestList: Guest[] = [
  { code: 'NIKDAN-NIKIT-A2B3', name: 'Nikita', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-DANIE-C4D5', name: 'Daniel', maxGuests: 1, hasRSVPd: false },

  { code: 'NIKDAN-PAPWW-E6F7', name: 'Pa PW', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-MALUR-J2K3', name: 'Ma Lurette', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-GIOVA-N6P7', name: 'Giovan', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-GHERH-S2T3', name: 'Gherhard', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-LUANS-W6X7', name: 'Luan', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-AMBER-A3B4', name: 'Amber', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-RIKUS-E7F8', name: 'Rikus', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-SUNEP-J3K4', name: 'Sune', maxGuests: 2, hasRSVPd: false, plusOne: true },
  { code: 'NIKDAN-RIANB-L5M6', name: 'Rianca', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-BRAND-Q9R2', name: 'Brandon', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-MEGAN-U5V6', name: 'Megan', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-ELKES-Y9Z2', name: 'Elke', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-TMELA-C6D7', name: 'Tani Melanie', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-TSAND-G2H3', name: 'Tani Sandra', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-TRIAN-J4K5', name: 'Riana', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-OFRIK-N8P9', name: 'Oom Frikkie', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-OHEIN-S4T5', name: 'Oom Heinz', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-OLIDI-W8X9', name: 'Ouma Lidia', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-ALANI-A5B6', name: 'Alani', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-LALIQ-E9F2', name: 'Lalique', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-CORIK-J5K6', name: 'Corika', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-SCHAL-N9P2', name: 'Schalk', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-FREDR-Q3R4', name: 'Frederik', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-LARAH-S5T6', name: 'Lara Hirsch', maxGuests: 2, hasRSVPd: false, plusOne: true },
  { code: 'NIKDAN-MONDE-W9X2', name: 'Mondrey', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-CHENE-A6B7', name: 'Chene', maxGuests: 1, hasRSVPd: false },

  { code: 'NIKDAN-PAPHI-G8H9', name: 'Pa Phillip', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-MACHA-L4M5', name: 'Ma Chari', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-JOSHU-Q8R9', name: 'Josh', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-SHANN-U4V5', name: 'Shannon', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-LEOVD-Y8Z9', name: 'Leo', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-CHRYS-C5D6', name: 'Chrystal', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-FRANS-G9H2', name: 'Frans', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-OBENN-N7P8', name: 'Ben & Ina', maxGuests: 2, hasRSVPd: false, plusOne: true },
  { code: 'NIKDAN-OBOZZ-S3T4', name: 'Oom Bozz', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-TLIES-W7X8', name: 'Tani Liezel', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-LILLI-A4B5', name: 'Lillie', maxGuests: 2, hasRSVPd: false, plusOne: true },
  { code: 'NIKDAN-ZELLI-E8F9', name: 'Zellie', maxGuests: 2, hasRSVPd: false, plusOne: true },
  { code: 'NIKDAN-DANIV-L6M7', name: 'Danie', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-TAMAN-Q2R3', name: 'Tani Amanda', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-OTHUN-U6V7', name: 'Oom Thunus', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-TALIS-Y2Z3', name: 'Tani Alisma', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-ANGIE-C7D8', name: 'Angie', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-ALBAN-G3H4', name: 'Alban', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-ORONA-L7M8', name: 'Ouma Rona', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-MARJO-U7V8', name: 'Marjone', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-GERHA-Y3Z4', name: 'Gerhard', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-MICHE-D4E5', name: 'Michelle', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-OOUBO-F6G7', name: 'Oom Ou Boet', maxGuests: 3, hasRSVPd: false },
  { code: 'NIKDAN-ROCCO-H8J9', name: 'Rocco', maxGuests: 1, hasRSVPd: false },
  { code: 'NIKDAN-OPALE-K2L3', name: 'Opal', maxGuests: 1, hasRSVPd: false },
];

export function findGuestByCode(code: string): Guest | null {
  const normalizedCode = code.toUpperCase().trim();
  return guestList.find((guest) => guest.code === normalizedCode) || null;
}

export function toPublicGuest(guest: Guest): PublicGuest {
  return {
    code: guest.code,
    name: guest.name,
    plusOne: guest.plusOne,
    maxGuests: guest.maxGuests,
    hasRSVPd: guest.hasRSVPd,
    isAttending: guest.isAttending,
  };
}
