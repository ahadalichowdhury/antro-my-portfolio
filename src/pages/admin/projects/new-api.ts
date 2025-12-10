import type { APIRoute } from "astro";
import { getProjectsCollection } from "../../../lib/models";
import { requireAuth } from "../../../lib/session";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  console.log(
    "[Server] ========== POST /admin/projects/new-api CALLED =========="
  );

  try {
    const session = await requireAuth(cookies);
    if (!session) {
      console.log("[Server] Unauthorized - no session");
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("[Server] Session found for:", session.email);

    const formData = await request.formData();
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const githubLink = formData.get("githubLink")?.toString();
    const liveUrl = formData.get("liveUrl")?.toString() || "";
    const orderStr = formData.get("order")?.toString();
    const publishedValue = formData.get("published");
    const published = publishedValue === "true";

    console.log("[Server] Form data received:");
    console.log("[Server] - title:", title);
    console.log(
      "[Server] - description:",
      description?.substring(0, 50) + "..."
    );
    console.log("[Server] - githubLink:", githubLink);
    console.log("[Server] - liveUrl:", liveUrl);
    console.log("[Server] - order:", orderStr);
    console.log("[Server] - published:", published);

    if (!title || !description || !githubLink || !orderStr) {
      console.log("[Server] Missing required fields");
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const order = parseInt(orderStr, 10);
    if (isNaN(order) || order < 1) {
      console.log("[Server] Invalid order value");
      return new Response(JSON.stringify({ error: "Invalid order value" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const projectsCollection = await getProjectsCollection();
    const now = new Date();

    console.log("[Server] Inserting project into database...");

    const projectData = {
      title,
      description,
      githubLink,
      liveUrl: liveUrl.trim() || undefined,
      order,
      published,
      createdAt: now,
      updatedAt: now,
    };

    console.log("[Server] Project data:", JSON.stringify(projectData, null, 2));

    const result = await projectsCollection.insertOne(projectData);
    console.log(
      "[Server] Project inserted successfully! ID:",
      result.insertedId.toString()
    );
    console.log("[Server] Redirecting to /admin/projects");

    return redirect("/admin/projects", 302);
  } catch (error) {
    console.error("[Server] ERROR in POST /admin/projects/new-api:", error);
    console.error(
      "[Server] Error stack:",
      error instanceof Error ? error.stack : "No stack"
    );
    return new Response(
      JSON.stringify({ error: "An error occurred while creating the project" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
