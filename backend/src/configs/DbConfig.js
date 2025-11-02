// src/configs/DbConfig.js
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connectToMongo() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");
    return client.db(); // optionally pass db name here: client.db("yourDBName")
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}
