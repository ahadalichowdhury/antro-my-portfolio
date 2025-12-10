import type { APIRoute } from "astro";
import { verifyAdmin } from "../../lib/auth";
import { createSession } from "../../lib/session";

// Test GET handler to verify the file is being loaded
export const GET: APIRoute = async () => {
  console.log("[Server] GET /admin/login-api called - API route is working!");
  return new Response("API route is working", { status: 200 });
};

export const POST: APIRoute = async ({ request, cookies }) => {
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
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const admin = await verifyAdmin(email, password);
    if (!admin) {
      console.log("Invalid credentials for:", email);
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log(
      "[Server] Login successful, creating session for:",
      admin.email
    );
    await createSession(cookies, admin.email);
    console.log("[Server] Session created successfully");

    // Verify cookie was set
    const cookieValue = cookies.get("admin_session")?.value;
    console.log(
      "[Server] Cookie value after creation:",
      cookieValue ? "SET" : "NOT SET"
    );

    // Return JSON response with success flag - client will handle redirect
    console.log("[Server] Returning success JSON response");
    return new Response(JSON.stringify({ success: true, redirect: "/admin" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
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
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
