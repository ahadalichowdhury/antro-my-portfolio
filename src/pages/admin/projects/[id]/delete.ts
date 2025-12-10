import type { APIRoute } from "astro";
import { ObjectId } from "mongodb";
import { getProjectsCollection } from "../../../../lib/models";
import { requireAuth } from "../../../../lib/session";

export const POST: APIRoute = async ({ params, cookies, redirect }) => {
  console.log(
    "[Server] ========== POST /admin/projects/[id]/delete CALLED =========="
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

    const { id } = params;
    if (!id) {
      console.log("[Server] Project ID required");
      return new Response(JSON.stringify({ error: "Project ID required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("[Server] Deleting project with ID:", id);

    const projectsCollection = await getProjectsCollection();
    const deleteResult = await projectsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount === 0) {
      console.log("[Server] Project not found");
      return new Response(JSON.stringify({ error: "Project not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("[Server] Project deleted successfully!");
    console.log("[Server] Redirecting to /admin/projects");

    return redirect("/admin/projects", 302);
  } catch (error) {
    console.error("[Server] ERROR in POST /admin/projects/[id]/delete:", error);
    console.error(
      "[Server] Error stack:",
      error instanceof Error ? error.stack : "No stack"
    );
    return new Response(
      JSON.stringify({ error: "An error occurred while deleting the project" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
