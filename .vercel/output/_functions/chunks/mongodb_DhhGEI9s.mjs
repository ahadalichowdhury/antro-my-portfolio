import { MongoClient } from 'mongodb';

const options = {};
let client;
let clientPromise = null;
function getMongoUri() {
  if (!process.env.MONGODB_URI) {
    throw new Error("Please add your Mongo URI to .env");
  }
  return process.env.MONGODB_URI;
}
function getClientPromise() {
  if (clientPromise) {
    return clientPromise;
  }
  const uri = getMongoUri();
  if (process.env.NODE_ENV === "development") {
    let globalWithMongo = global;
    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
  return clientPromise;
}
async function getDatabase() {
  const client2 = await getClientPromise();
  return client2.db();
}

export { getDatabase as g };
