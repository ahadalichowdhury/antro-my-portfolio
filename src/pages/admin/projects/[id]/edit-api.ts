import type { APIRoute } from "astro";
import { ObjectId } from "mongodb";
import { getProjectsCollection } from "../../../../lib/models";
import { requireAuth } from "../../../../lib/session";

export const POST: APIRoute = async ({ params, request, cookies, redirect }) => {
  console.log("[Server] ========== POST /admin/projects/[id]/edit-api CALLED ==========");

  try {
    const session = await requireAuth(cookies);
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ error: "Project ID required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const formData = await request.formData();

    // Required
    const title = formData.get("title")?.toString();
    const slug = formData.get("slug")?.toString()?.toLowerCase().replace(/[^a-z0-9-]/g, "-");
    const description = formData.get("description")?.toString();
    const githubLink = formData.get("githubLink")?.toString();
    const orderStr = formData.get("order")?.toString();
    const published = formData.get("published") === "true";

    // Optional basic
    const liveUrl = formData.get("liveUrl")?.toString() || "";
    const coverImage = formData.get("coverImage")?.toString() || "";
    const tagsRaw = formData.get("tags")?.toString() || "";

    // Meta info
    const client = formData.get("client")?.toString() || "";
    const projectDate = formData.get("projectDate")?.toString() || "";
    const duration = formData.get("duration")?.toString() || "";
    const category = formData.get("category")?.toString() || "";

    // Detail content
    const challenge = formData.get("challenge")?.toString() || "";
    const solution = formData.get("solution")?.toString() || "";

    // Gallery — one URL per line
    const galleryRaw = formData.get("gallery")?.toString() || "";
    const gallery = galleryRaw
      .split("\n")
      .map((u) => u.trim())
      .filter((u) => u.length > 0);

    // Results — one per line
    const resultsRaw = formData.get("results")?.toString() || "";
    const results = resultsRaw
      .split("\n")
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    // Testimonial
    const testimonialText = formData.get("testimonialText")?.toString() || "";
    const testimonialAuthor = formData.get("testimonialAuthor")?.toString() || "";
    const testimonialRole = formData.get("testimonialRole")?.toString() || "";

    if (!title || !slug || !description || !githubLink || !orderStr) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const order = parseInt(orderStr, 10);
    if (isNaN(order) || order < 1) {
      return new Response(JSON.stringify({ error: "Invalid order value" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const projectsCollection = await getProjectsCollection();

    // Check if slug is taken by another project
    const existingProject = await projectsCollection.findOne({
      slug,
      _id: { $ne: new ObjectId(id) },
    });
    if (existingProject) {
      return new Response(JSON.stringify({ error: "Slug already taken by another project" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const tags = tagsRaw.split(",").map((t) => t.trim()).filter((t) => t.length > 0);

    const updateData: any = {
      title,
      slug,
      description,
      githubLink,
      order,
      published,
      tags,
      updatedAt: new Date(),
    };

    // Fields that should be removed if empty
    const unsetFields: any = {};

    const setIfProvided = (key: string, val: string) => {
      if (val.trim()) updateData[key] = val.trim();
      else unsetFields[key] = "";
    };
    const setArrayIfProvided = (key: string, arr: string[]) => {
      if (arr.length > 0) updateData[key] = arr;
      else unsetFields[key] = "";
    };

    setIfProvided("liveUrl", liveUrl);
    setIfProvided("coverImage", coverImage);
    setIfProvided("client", client);
    setIfProvided("projectDate", projectDate);
    setIfProvided("duration", duration);
    setIfProvided("category", category);
    setIfProvided("challenge", challenge);
    setIfProvided("solution", solution);
    setIfProvided("testimonialText", testimonialText);
    setIfProvided("testimonialAuthor", testimonialAuthor);
    setIfProvided("testimonialRole", testimonialRole);
    setArrayIfProvided("gallery", gallery);
    setArrayIfProvided("results", results);

    const updateQuery: any = { $set: updateData };
    if (Object.keys(unsetFields).length > 0) {
      updateQuery.$unset = unsetFields;
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

    return redirect("/admin/projects", 302);
  } catch (error) {
    console.error("[Server] ERROR in POST /admin/projects/[id]/edit-api:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred while updating the project" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
