import { cookies } from 'next/headers';
import { createHash } from 'crypto';

const AUTH_COOKIE_NAME = 'fitness_auth';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getAuthToken(): string {
  // Create a hash of the password to use as the auth token
  const password = process.env.PASSWORD || '';
  return createHash('sha256').update(password).digest('hex');
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(AUTH_COOKIE_NAME);

  if (!authCookie) {
    return false;
  }

  return authCookie.value === getAuthToken();
}

export function verifyPassword(password: string): boolean {
  return password === process.env.PASSWORD;
}

export function getAuthCookieValue(): string {
  return getAuthToken();
}

export { AUTH_COOKIE_NAME, COOKIE_MAX_AGE };
