// index.js
import { connectToMongo } from './src/configs/DbConfig.js';

async function run() {
  try {
    const db = await connectToMongo();
    console.log("📦 Database Connected");

    const collection = db.collection("Pet_Store"); // Replace with your collection name

    // Fetch all documents
    const documents = await collection.find({}).toArray();

    // Display in VS Code terminal
    console.log("📄 Documents in Collection:");
    console.log(documents);
  } catch (err) {
    console.error("❌ Error during DB operation:", err);
  }
}

run();
