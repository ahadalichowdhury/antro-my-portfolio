/**
 * Script to initialize the first admin user
 * Run with: npx tsx scripts/init-admin.ts
 */
import "dotenv/config";
import { createAdmin } from "../src/lib/auth";
import { getAdminsCollection } from "../src/lib/models";

async function initAdmin() {
  const email = process.env.ADMIN_EMAIL || "admin@example.com";
  const password = process.env.ADMIN_PASSWORD || "changeme";

  const admins = await getAdminsCollection();
  const existing = await admins.findOne({ email });

  if (existing) {
    console.log(`Admin with email ${email} already exists.`);
    return;
  }

  await createAdmin(email, password);
  console.log(`Admin created successfully with email: ${email}`);
  console.log("Please change the default password after first login.");
}

initAdmin().catch(console.error);
