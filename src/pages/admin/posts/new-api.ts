import type { APIRoute } from "astro";
import { getAdminsCollection, getPostsCollection } from "../../../lib/models";
import { requireAuth } from "../../../lib/session";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  console.log(
    "[Server] ========== POST /admin/posts/new-api CALLED =========="
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

    // Check if slug already exists
    console.log("[Server] Checking if slug exists:", slug);
    const postsCollection = await getPostsCollection();
    const existingPost = await postsCollection.findOne({ slug });
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

    const now = new Date();
    const adminEmail = session.email;
    console.log("[Server] Finding admin by email:", adminEmail);
    const adminsCollection = await getAdminsCollection();
    const admin = await adminsCollection.findOne({ email: adminEmail });

    if (!admin || !admin._id) {
      console.log("[Server] Admin not found");
      return new Response(JSON.stringify({ error: "Admin not found" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("[Server] Admin found, ID:", admin._id.toString());
    console.log("[Server] Inserting post into database...");

    const postData = {
      title,
      slug,
      description,
      content,
      contentFormat,
      tags: tagArray,
      coverImage: coverImage.trim() || undefined,
      createdAt: now,
      updatedAt: now,
      authorId: admin._id,
      published,
    };

    console.log("[Server] Post data:", JSON.stringify(postData, null, 2));

    const result = await postsCollection.insertOne(postData);
    console.log(
      "[Server] Post inserted successfully! ID:",
      result.insertedId.toString()
    );
    console.log("[Server] Redirecting to /admin");

    return redirect("/admin", 302);
  } catch (error) {
    console.error("[Server] ERROR in POST /admin/posts/new:", error);
    console.error(
      "[Server] Error stack:",
      error instanceof Error ? error.stack : "No stack"
    );
    return new Response(
      JSON.stringify({ error: "An error occurred while creating the post" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
