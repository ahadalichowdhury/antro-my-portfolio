import type { APIRoute } from "astro";
import { getProjectsCollection } from "../../../lib/models";
import { requireAuth } from "../../../lib/session";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  console.log("[Server] ========== POST /admin/projects/new-api CALLED ==========");

  try {
    const session = await requireAuth(cookies);
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const formData = await request.formData();

    // Required fields
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

    // Check duplicate slug
    const existingProject = await projectsCollection.findOne({ slug });
    if (existingProject) {
      return new Response(JSON.stringify({ error: "Slug already exists" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const tags = tagsRaw.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
    const now = new Date();

    const projectData: any = {
      title,
      slug,
      description,
      githubLink,
      order,
      published,
      tags,
      createdAt: now,
      updatedAt: now,
    };

    // Only include optional fields if provided
    if (liveUrl.trim()) projectData.liveUrl = liveUrl.trim();
    if (coverImage.trim()) projectData.coverImage = coverImage.trim();
    if (client.trim()) projectData.client = client.trim();
    if (projectDate.trim()) projectData.projectDate = projectDate.trim();
    if (duration.trim()) projectData.duration = duration.trim();
    if (category.trim()) projectData.category = category.trim();
    if (challenge.trim()) projectData.challenge = challenge.trim();
    if (solution.trim()) projectData.solution = solution.trim();
    if (gallery.length > 0) projectData.gallery = gallery;
    if (results.length > 0) projectData.results = results;
    if (testimonialText.trim()) projectData.testimonialText = testimonialText.trim();
    if (testimonialAuthor.trim()) projectData.testimonialAuthor = testimonialAuthor.trim();
    if (testimonialRole.trim()) projectData.testimonialRole = testimonialRole.trim();

    const result = await projectsCollection.insertOne(projectData);
    console.log("[Server] Project inserted successfully! ID:", result.insertedId.toString());

    return redirect("/admin/projects", 302);
  } catch (error) {
    console.error("[Server] ERROR in POST /admin/projects/new-api:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred while creating the project" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
