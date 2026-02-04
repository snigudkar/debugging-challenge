const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = express();

const PORT = 5000;
const API_PATH = '/api/posts';

//  MIDDLEWARE ---
app.use(cors());
app.use(express.json());

//  DATABASE SETUP (In-Memory MongoDB) ---
async function startDB() {
  const mongo = await MongoMemoryServer.create({
    instance: {
      launchTimeout: 60000, // avoids startup timeout in Codespaces
    },
  });

  const uri = mongo.getUri();
  await mongoose.connect(uri);

  console.log("In-Memory MongoDB Connected");
}

startDB().catch(err => {
  console.error("DB Startup Error:", err);
});

//  DATA MODEL ---
const PostSchema = new mongoose.Schema({
  username: String,
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', PostSchema);

//  ROUTES ---

app.post(API_PATH, async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

app.put(API_PATH, async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: "Error saving post" });
  }
});

