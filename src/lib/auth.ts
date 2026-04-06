export interface Guest {
  code: string;
  name: string;
  email?: string;
  plusOne?: boolean;
  maxGuests: number;
  hasRSVPd: boolean;
  isAttending?: boolean;
  dietaryRequirements?: string;
  accommodationNeeded?: boolean;
  accommodationType?: string;
}

export type PublicGuest = Pick<
  Guest,
  'code' | 'name' | 'plusOne' | 'maxGuests' | 'hasRSVPd' | 'isAttending'
>;

export function createGuestOptions(maxGuests: number): number[] {
  return Array.from({ length: Math.max(1, maxGuests) }, (_, index) => index + 1);
}
