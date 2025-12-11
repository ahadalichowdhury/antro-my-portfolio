import type { APIRoute } from "astro";
import { ObjectId } from "mongodb";
import { getPostsCollection } from "../../../../lib/models";
import { requireAuth } from "../../../../lib/session";

export const POST: APIRoute = async ({
  params,
  request,
  cookies,
  redirect,
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
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("[Server] Session found for:", session.email);

    const { id } = params;
    if (!id) {
      console.log("[Server] Post ID required");
      return new Response(JSON.stringify({ error: "Post ID required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
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
    const contentFormat = (formData.get("contentFormat")?.toString() ||
      "html") as "html" | "markdown";
    // Checkbox: if checked, value is "true", if unchecked, it might be "false" or not present
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
    console.log("[Server] - contentFormat:", contentFormat);
    console.log("[Server] - tags:", tags);
    console.log("[Server] - coverImage:", coverImage);
    console.log("[Server] - published:", published);

    if (!title || !slug || !description || !content) {
      console.log("[Server] Missing required fields");
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const postsCollection = await getPostsCollection();

    // Check if slug is taken by another post
    console.log("[Server] Checking if slug exists for another post:", slug);
    const existingPost = await postsCollection.findOne({
      slug,
      _id: { $ne: new ObjectId(id) },
    });
    if (existingPost) {
      console.log("[Server] Slug already exists");
      return new Response(JSON.stringify({ error: "Slug already exists" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const tagArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    console.log("[Server] Updating post in database...");
    const updateData: any = {
      title,
      slug,
      description,
      content,
      contentFormat,
      tags: tagArray,
      published,
      updatedAt: new Date(),
    };

    // Only include coverImage if it's provided
    if (coverImage.trim()) {
      updateData.coverImage = coverImage.trim();
    }

    const updateQuery: any = { $set: updateData };

    // If coverImage is empty, remove it from the document
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
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
