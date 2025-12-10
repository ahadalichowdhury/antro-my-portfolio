import type { APIRoute } from "astro";
import { ObjectId } from "mongodb";
import { getPostsCollection } from "../../lib/models";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { postId, readingTime } = body;

    if (!postId) {
      return new Response(JSON.stringify({ error: "Post ID required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const postsCollection = await getPostsCollection();

    // Build query - check if postId is a valid ObjectId, otherwise treat as slug
    let query: any;
    const isValidObjectId = ObjectId.isValid(postId) && postId.length === 24;

    console.log("[API] postId:", postId, "isValidObjectId:", isValidObjectId);

    if (isValidObjectId) {
      // It's a valid ObjectId
      try {
        query = { _id: new ObjectId(postId) };
      } catch (e) {
        // Fallback to slug if ObjectId creation fails
        console.log("[API] ObjectId creation failed, using slug:", postId);
        query = { slug: postId };
      }
    } else {
      // It's a slug
      query = { slug: postId };
    }

    console.log("[API] Query:", JSON.stringify(query));

    // Find the post first
    const post = await postsCollection.findOne(query);

    if (!post) {
      console.log("[API] Post not found for postId:", postId);
      return new Response(JSON.stringify({ error: "Post not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Build update data
    const updateData: any = {};

    // If viewCount doesn't exist, set it to 1, otherwise increment
    if (post.viewCount === undefined) {
      updateData.$set = { viewCount: 1 };
      updateData.$set.readingTimes = [];
    } else {
      updateData.$inc = { viewCount: 1 };
    }

    // If reading time is provided, add it to the array
    if (typeof readingTime === "number" && readingTime > 0) {
      if (updateData.$set) {
        // If we're setting viewCount, also initialize readingTimes if needed
        if (!updateData.$set.readingTimes) {
          updateData.$set.readingTimes = post.readingTimes || [];
        }
        updateData.$set.readingTimes = [
          ...(post.readingTimes || []),
          readingTime,
        ];
      } else {
        // If we're incrementing, push to existing array
        updateData.$push = { readingTimes: readingTime };
      }
    }

    await postsCollection.updateOne(query, updateData);

    console.log(
      "[API] Successfully tracked view for postId:",
      postId,
      "readingTime:",
      readingTime || "none"
    );

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[API] Error tracking view:", error);
    return new Response(JSON.stringify({ error: "Failed to track view" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
