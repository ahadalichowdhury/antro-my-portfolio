/**
 * Utility to clean up expired sessions
 * Can be run as a cron job or periodically
 */
import { getDatabase } from './mongodb';

export async function cleanupExpiredSessions() {
  const db = await getDatabase();
  const sessions = db.collection('sessions');
  const result = await sessions.deleteMany({
    expires: { $lt: new Date() },
  });
  return result.deletedCount;
}

