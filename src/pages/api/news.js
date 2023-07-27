const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://news-portal-user:qJDsxXrDA5b527Z7@cluster0.j6uwcgb.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run(req, res) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    // console.log("Database connected successfully");

    const newsCollection = client.db("news-portal").collection("news");

    // Get all news
    if (req.method === "GET") {
      const news = await newsCollection.find({}).toArray();
      res.send({
        message: "Data loaded successfully",
        status: 200,
        data: news,
      });
    }

    // Post a news
    if (req.method === "POST") {
      const news = req.body;
      const result = await newsCollection.insertOne(news);
      res.json(result);
    }
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
// run().catch(console.dir);

export default run;
