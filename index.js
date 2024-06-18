import express from "express";
import axios from "axios";

const app = express();

const SERVER_PORT = 3000;

app.get("/", (_, res) => {
  return res.json({ result: "success" });
});

app.get("/posts", async (_, res) => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const posts = await response.data;

  return res.json(posts);
});

app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const post = response.data;

  return res.json(post);
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});
