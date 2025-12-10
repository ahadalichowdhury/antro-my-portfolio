import bcrypt from "bcryptjs";
import type { Admin } from "./models";
import { getAdminsCollection } from "./models";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function findAdminByEmail(email: string): Promise<Admin | null> {
  const admins = await getAdminsCollection();
  const admin = await admins.findOne({ email });
  console.log("[Auth] Looking for admin with email:", email);
  console.log("[Auth] Admin found:", admin ? "YES" : "NO");
  if (admin) {
    console.log("[Auth] Admin ID:", admin._id?.toString());
  }
  return admin;
}

export async function createAdmin(
  email: string,
  password: string
): Promise<Admin> {
  const admins = await getAdminsCollection();
  const hashedPassword = await hashPassword(password);

  const admin: Admin = {
    email,
    hashedPassword,
    createdAt: new Date(),
  };

  const result = await admins.insertOne(admin);
  return { ...admin, _id: result.insertedId };
}

export async function verifyAdmin(
  email: string,
  password: string
): Promise<Admin | null> {
  const admin = await findAdminByEmail(email);
  if (!admin) {
    console.log("[Auth] Admin not found for email:", email);
    return null;
  }

  console.log("[Auth] Verifying password for admin:", email);
  const isValid = await verifyPassword(password, admin.hashedPassword);
  console.log("[Auth] Password valid:", isValid ? "YES" : "NO");
  return isValid ? admin : null;
}
