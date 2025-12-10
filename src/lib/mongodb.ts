import { Db, MongoClient } from "mongodb";

// Note: Environment variables are loaded in astro.config.mjs
// This ensures .env is loaded before any MongoDB connection attempts

const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient> | null = null;

function getMongoUri(): string {
  if (!process.env.MONGODB_URI) {
    throw new Error("Please add your Mongo URI to .env");
  }
  return process.env.MONGODB_URI;
}

function getClientPromise(): Promise<MongoClient> {
  if (clientPromise) {
    return clientPromise;
  }

  const uri = getMongoUri();

  if (process.env.NODE_ENV === "development") {
    let globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }

  return clientPromise;
}

export async function getDatabase(): Promise<Db> {
  const client = await getClientPromise();
  return client.db();
}

export default getClientPromise;
