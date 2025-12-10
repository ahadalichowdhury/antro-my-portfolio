import { ObjectId } from 'mongodb';
import { g as getPostsCollection } from '../../../../chunks/models_CquBuAEI.mjs';
import { requireAuth } from '../../../../chunks/session_CvEO55jf.mjs';
export { renderers } from '../../../../renderers.mjs';

const POST = async ({
  params,
  request,
  cookies,
  redirect
}) => {
  console.log(
    "[Server] ========== POST /admin/posts/[id]/edit-api CALLED =========="
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
      console.log("[Server] Post ID required");
      return new Response(JSON.stringify({ error: "Post ID required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    console.log("[Server] Updating post with ID:", id);
    const formData = await request.formData();
    const title = formData.get("title")?.toString();
    const slug = formData.get("slug")?.toString();
    const description = formData.get("description")?.toString();
    const content = formData.get("content")?.toString();
    const tags = formData.get("tags")?.toString() || "";
    const coverImage = formData.get("coverImage")?.toString() || "";
    const publishedValue = formData.get("published");
    const published = publishedValue === "true";
    console.log("[Server] Form data received:");
    console.log("[Server] - title:", title);
    console.log("[Server] - slug:", slug);
    console.log(
      "[Server] - description:",
      description?.substring(0, 50) + "..."
    );
    console.log("[Server] - content length:", content?.length || 0);
    console.log("[Server] - tags:", tags);
    console.log("[Server] - coverImage:", coverImage);
    console.log("[Server] - published:", published);
    if (!title || !slug || !description || !content) {
      console.log("[Server] Missing required fields");
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const postsCollection = await getPostsCollection();
    console.log("[Server] Checking if slug exists for another post:", slug);
    const existingPost = await postsCollection.findOne({
      slug,
      _id: { $ne: new ObjectId(id) }
    });
    if (existingPost) {
      console.log("[Server] Slug already exists");
      return new Response(JSON.stringify({ error: "Slug already exists" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const tagArray = tags.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
    console.log("[Server] Updating post in database...");
    const updateData = {
      title,
      slug,
      description,
      content,
      tags: tagArray,
      published,
      updatedAt: /* @__PURE__ */ new Date()
    };
    if (coverImage.trim()) {
      updateData.coverImage = coverImage.trim();
    }
    const updateQuery = { $set: updateData };
    if (!coverImage.trim()) {
      updateQuery.$unset = { coverImage: "" };
    }
    const updateResult = await postsCollection.updateOne(
      { _id: new ObjectId(id) },
      updateQuery
    );
    console.log(
      "[Server] Post updated successfully! Matched:",
      updateResult.matchedCount,
      "Modified:",
      updateResult.modifiedCount
    );
    console.log("[Server] Redirecting to /admin");
    return redirect("/admin", 302);
  } catch (error) {
    console.error("[Server] ERROR in POST /admin/posts/[id]/edit-api:", error);
    console.error(
      "[Server] Error stack:",
      error instanceof Error ? error.stack : "No stack"
    );
    return new Response(
      JSON.stringify({ error: "An error occurred while updating the post" }),
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
