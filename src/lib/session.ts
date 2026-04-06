import 'server-only';

import crypto from 'node:crypto';

import type { Guest } from '@/lib/auth';
import { findGuestByCode } from '@/lib/invite-list.server';

export const SESSION_COOKIE_NAME = 'nikdan_wedding_session';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 180;

function getSessionSecret() {
  const secret = process.env.WEDDING_AUTH_SECRET || process.env.AUTH_SECRET;

  if (secret) {
    return secret;
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('WEDDING_AUTH_SECRET or AUTH_SECRET must be set in production.');
  }

  return 'replace-this-secret-before-production';
}

function signCode(code: string) {
  return crypto.createHmac('sha256', getSessionSecret()).update(code).digest('base64url');
}

export function createSessionValue(code: string) {
  const normalizedCode = code.toUpperCase().trim();
  return `${normalizedCode}.${signCode(normalizedCode)}`;
}

export function getGuestFromSession(value?: string | null): Guest | null {
  if (!value) return null;

  const separatorIndex = value.lastIndexOf('.');
  if (separatorIndex <= 0) return null;

  const code = value.slice(0, separatorIndex);
  const signature = value.slice(separatorIndex + 1);
  const expectedSignature = signCode(code);

  if (signature.length !== expectedSignature.length) return null;

  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (!crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return null;
  }

  return findGuestByCode(code);
}
