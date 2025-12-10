import { ObjectId } from 'mongodb';
import { g as getPostsCollection } from '../../chunks/models_CquBuAEI.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { postId, readingTime } = body;
    if (!postId) {
      return new Response(JSON.stringify({ error: "Post ID required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const postsCollection = await getPostsCollection();
    let query;
    const isValidObjectId = ObjectId.isValid(postId) && postId.length === 24;
    console.log("[API] postId:", postId, "isValidObjectId:", isValidObjectId);
    if (isValidObjectId) {
      try {
        query = { _id: new ObjectId(postId) };
      } catch (e) {
        console.log("[API] ObjectId creation failed, using slug:", postId);
        query = { slug: postId };
      }
    } else {
      query = { slug: postId };
    }
    console.log("[API] Query:", JSON.stringify(query));
    const post = await postsCollection.findOne(query);
    if (!post) {
      console.log("[API] Post not found for postId:", postId);
      return new Response(JSON.stringify({ error: "Post not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    const updateData = {};
    if (post.viewCount === void 0) {
      updateData.$set = { viewCount: 1 };
      updateData.$set.readingTimes = [];
    } else {
      updateData.$inc = { viewCount: 1 };
    }
    if (typeof readingTime === "number" && readingTime > 0) {
      if (updateData.$set) {
        if (!updateData.$set.readingTimes) {
          updateData.$set.readingTimes = post.readingTimes || [];
        }
        updateData.$set.readingTimes = [
          ...post.readingTimes || [],
          readingTime
        ];
      } else {
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
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("[API] Error tracking view:", error);
    return new Response(JSON.stringify({ error: "Failed to track view" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
