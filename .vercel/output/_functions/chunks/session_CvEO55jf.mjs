import { g as getDatabase } from './mongodb_DhhGEI9s.mjs';

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1e3;
async function createSession(cookies, email) {
  const sessionId = crypto.randomUUID();
  const expires = new Date(Date.now() + SESSION_DURATION);
  const db = await getDatabase();
  const sessions = db.collection("sessions");
  await sessions.insertOne({
    sessionId,
    email,
    expires
  });
  cookies.set(SESSION_COOKIE_NAME, sessionId, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires
  });
}
async function getSession(cookies) {
  return cookies.get(SESSION_COOKIE_NAME)?.value || null;
}
async function destroySession(cookies) {
  const sessionId = await getSession(cookies);
  if (sessionId) {
    const db = await getDatabase();
    const sessions = db.collection("sessions");
    await sessions.deleteOne({ sessionId });
  }
  cookies.delete(SESSION_COOKIE_NAME, {
    path: "/"
  });
}
async function requireAuth(cookies) {
  const sessionId = await getSession(cookies);
  if (!sessionId) return null;
  const db = await getDatabase();
  const sessions = db.collection("sessions");
  const session = await sessions.findOne({ sessionId });
  if (!session) return null;
  if (session.expires < /* @__PURE__ */ new Date()) {
    await sessions.deleteOne({ sessionId });
    await destroySession(cookies);
    return null;
  }
  return { email: session.email };
}

export { createSession, destroySession, getSession, requireAuth };
