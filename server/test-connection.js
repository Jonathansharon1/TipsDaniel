require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

// Get the connection string from MongoDB Atlas
const uri = "mongodb+srv://testuser:test123@cluster0.0ggqwbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

console.log('Testing connection with MongoDB Atlas...');
console.log('Connection string (without password):', uri.replace(/:[^:@]*@/, ':****@'));

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir); 