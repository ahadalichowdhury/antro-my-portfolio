import bcrypt from 'bcryptjs';
import { a as getAdminsCollection } from '../../chunks/models_CquBuAEI.mjs';
import { createSession } from '../../chunks/session_CvEO55jf.mjs';
export { renderers } from '../../renderers.mjs';

async function verifyPassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}
async function findAdminByEmail(email) {
  const admins = await getAdminsCollection();
  const admin = await admins.findOne({ email });
  console.log("[Auth] Looking for admin with email:", email);
  console.log("[Auth] Admin found:", admin ? "YES" : "NO");
  if (admin) {
    console.log("[Auth] Admin ID:", admin._id?.toString());
  }
  return admin;
}
async function verifyAdmin(email, password) {
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

const GET = async () => {
  console.log("[Server] GET /admin/login-api called - API route is working!");
  return new Response("API route is working", { status: 200 });
};
const POST = async ({ request, cookies }) => {
  console.log("[Server] POST /admin/login-api called");
  try {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    console.log("[Server] Login attempt for:", email);
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const admin = await verifyAdmin(email, password);
    if (!admin) {
      console.log("Invalid credentials for:", email);
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    console.log(
      "[Server] Login successful, creating session for:",
      admin.email
    );
    await createSession(cookies, admin.email);
    console.log("[Server] Session created successfully");
    const cookieValue = cookies.get("admin_session")?.value;
    console.log(
      "[Server] Cookie value after creation:",
      cookieValue ? "SET" : "NOT SET"
    );
    console.log("[Server] Returning success JSON response");
    return new Response(JSON.stringify({ success: true, redirect: "/admin" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("[Server] ERROR in login handler:", error);
    console.error("[Server] Error type:", typeof error);
    console.error(
      "[Server] Error stack:",
      error instanceof Error ? error.stack : "No stack"
    );
    return new Response(
      JSON.stringify({ error: "An error occurred during login" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
