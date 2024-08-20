import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

interface SessionData {
  id?: number;
}

export function getSession() {
  return getIronSession<SessionData>(cookies(), {
    cookieName: 'hwitter',
    password: process.env.COOKIE_PASSWORD!,
  });
}
