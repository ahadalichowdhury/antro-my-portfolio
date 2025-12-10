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
  content: string; // HTML content from rich text editor
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
  description: string;
  githubLink: string;
  liveUrl?: string;
  order: number; // Display order (1, 2, 3, etc.)
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
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
