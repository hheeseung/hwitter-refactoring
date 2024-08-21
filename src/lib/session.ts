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

export function getNextAuthSession() {
  return getIronSession(cookies(), {
    cookieName: 'next-auth.session-token',
    password: process.env.COOKIE_PASSWORD!,
  });
}

export async function sessionLogin(id: number) {
  const session = await getSession();
  session.id = id;
  await session.save();
}
