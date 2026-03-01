import { ObjectId } from "mongodb";
import { getDatabase } from "./mongodb";

export interface Admin {
  _id?: ObjectId;
  email: string;
  hashedPassword: string;
  createdAt: Date;
}

export interface BlogPost {
  _id?: ObjectId;
  title: string;
  slug: string;
  description: string;
  content: string; // HTML content from rich text editor or Markdown content
  contentFormat?: "html" | "markdown"; // Format of the content: 'html' for rich text, 'markdown' for markdown
  coverImage?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  authorId: ObjectId;
  published: boolean;
  viewCount?: number; // Number of times the post has been viewed
  readingTimes?: number[]; // Array of reading times in seconds for calculating average
}

export interface Project {
  _id?: ObjectId;
  title: string;
  slug: string;           // URL slug e.g. "previewcloud"
  description: string;    // Short summary shown on homepage card
  githubLink: string;
  liveUrl?: string;
  order: number;
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  // Detail page fields
  coverImage?: string;    // Hero image URL
  tags?: string[];        // e.g. ["Go", "Docker", "AWS"]
  challenge?: string;     // "The Challenge" section
  solution?: string;      // "Our Solution" section
  gallery?: string[];     // Array of image URLs for the gallery
  results?: string[];     // Bullet points of outcomes/results
  // Testimonial
  testimonialText?: string;
  testimonialAuthor?: string;
  testimonialRole?: string;
  // Meta info shown in the info bar
  client?: string;        // e.g. "Personal Project"
  projectDate?: string;   // e.g. "2024-2025"
  duration?: string;      // e.g. "6 months"
  category?: string;      // e.g. "Backend / DevOps"
}

export async function getAdminsCollection() {
  const db = await getDatabase();
  return db.collection<Admin>("admins");
}

export async function getPostsCollection() {
  const db = await getDatabase();
  // Try "blogposts" first (existing collection), fallback to "posts" (new collection)
  const collectionName = "blogposts";
  return db.collection<BlogPost>(collectionName);
}

export async function getProjectsCollection() {
  const db = await getDatabase();
  return db.collection<Project>("projects");
}
