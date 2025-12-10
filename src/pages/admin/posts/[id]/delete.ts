import type { APIRoute } from "astro";
import { ObjectId } from "mongodb";
import { getPostsCollection } from "../../../../lib/models";
import { requireAuth } from "../../../../lib/session";

export const POST: APIRoute = async ({ params, cookies, redirect }) => {
  const session = await requireAuth(cookies);
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { id } = params;
  if (!id) {
    return new Response(JSON.stringify({ error: "Post ID required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const postsCollection = await getPostsCollection();
  await postsCollection.deleteOne({ _id: new ObjectId(id) });

  return redirect("/admin", 302);
};
