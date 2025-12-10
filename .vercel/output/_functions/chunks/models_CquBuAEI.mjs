import 'mongodb';
import { g as getDatabase } from './mongodb_DhhGEI9s.mjs';

async function getAdminsCollection() {
  const db = await getDatabase();
  return db.collection("admins");
}
async function getPostsCollection() {
  const db = await getDatabase();
  const collectionName = "blogposts";
  return db.collection(collectionName);
}
async function getProjectsCollection() {
  const db = await getDatabase();
  return db.collection("projects");
}

export { getAdminsCollection as a, getProjectsCollection as b, getPostsCollection as g };
