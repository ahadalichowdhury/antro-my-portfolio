import type { AstroCookies } from "astro";
import { getDatabase } from "./mongodb";

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

interface Session {
  sessionId: string;
  email: string;
  expires: Date;
}

export async function createSession(
  cookies: AstroCookies,
  email: string
): Promise<void> {
  const sessionId = crypto.randomUUID();
  const expires = new Date(Date.now() + SESSION_DURATION);

  // Store session in MongoDB
  const db = await getDatabase();
  const sessions = db.collection<Session>("sessions");
  await sessions.insertOne({
    sessionId,
    email,
    expires,
  });

  // Set cookie
  cookies.set(SESSION_COOKIE_NAME, sessionId, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires,
  });
}

export async function getSession(
  cookies: AstroCookies
): Promise<string | null> {
  return cookies.get(SESSION_COOKIE_NAME)?.value || null;
}

export async function destroySession(cookies: AstroCookies): Promise<void> {
  const sessionId = await getSession(cookies);
  if (sessionId) {
    // Remove from database
    const db = await getDatabase();
    const sessions = db.collection<Session>("sessions");
    await sessions.deleteOne({ sessionId });
  }

  cookies.delete(SESSION_COOKIE_NAME, {
    path: "/",
  });
}

export async function requireAuth(
  cookies: AstroCookies
): Promise<{ email: string } | null> {
  const sessionId = await getSession(cookies);
  if (!sessionId) return null;

  // Look up session in database
  const db = await getDatabase();
  const sessions = db.collection<Session>("sessions");
  const session = await sessions.findOne({ sessionId });

  if (!session) return null;

  // Check if session expired
  if (session.expires < new Date()) {
    await sessions.deleteOne({ sessionId });
    await destroySession(cookies);
    return null;
  }

  return { email: session.email };
}
