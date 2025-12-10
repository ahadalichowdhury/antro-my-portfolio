import { ObjectId } from 'mongodb';
import { b as getProjectsCollection } from '../../../../chunks/models_CquBuAEI.mjs';
import { requireAuth } from '../../../../chunks/session_CvEO55jf.mjs';
export { renderers } from '../../../../renderers.mjs';

const POST = async ({
  params,
  request,
  cookies,
  redirect
}) => {
  console.log(
    "[Server] ========== POST /admin/projects/[id]/edit-api CALLED =========="
  );
  try {
    const session = await requireAuth(cookies);
    if (!session) {
      console.log("[Server] Unauthorized - no session");
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    console.log("[Server] Session found for:", session.email);
    const { id } = params;
    if (!id) {
      console.log("[Server] Project ID required");
      return new Response(JSON.stringify({ error: "Project ID required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    console.log("[Server] Updating project with ID:", id);
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
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const order = parseInt(orderStr, 10);
    if (isNaN(order) || order < 1) {
      console.log("[Server] Invalid order value");
      return new Response(JSON.stringify({ error: "Invalid order value" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const projectsCollection = await getProjectsCollection();
    console.log("[Server] Updating project in database...");
    const updateData = {
      title,
      description,
      githubLink,
      order,
      published,
      updatedAt: /* @__PURE__ */ new Date()
    };
    if (liveUrl.trim()) {
      updateData.liveUrl = liveUrl.trim();
    }
    const updateQuery = { $set: updateData };
    if (!liveUrl.trim()) {
      updateQuery.$unset = { liveUrl: "" };
    }
    const updateResult = await projectsCollection.updateOne(
      { _id: new ObjectId(id) },
      updateQuery
    );
    console.log(
      "[Server] Project updated successfully! Matched:",
      updateResult.matchedCount,
      "Modified:",
      updateResult.modifiedCount
    );
    console.log("[Server] Redirecting to /admin/projects");
    return redirect("/admin/projects", 302);
  } catch (error) {
    console.error(
      "[Server] ERROR in POST /admin/projects/[id]/edit-api:",
      error
    );
    console.error(
      "[Server] Error stack:",
      error instanceof Error ? error.stack : "No stack"
    );
    return new Response(
      JSON.stringify({ error: "An error occurred while updating the project" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
