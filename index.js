import express from "express";
import axios from "axios";
import { createClient } from "redis";

const app = express();

const SERVER_PORT = 3000;
const REDIS_PORT = 6379;

const redisClient = await createClient({
  url: `redis://127.0.0.1:${REDIS_PORT}`,
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

const cacheMiddleware = async (req, res, next) => {
  console.log("Entering cacheMiddleware");

  try {
    const data = await redisClient.get(req.url);
    console.log("Redis get completed");

    if (data !== null) {
      console.log("Data found in cache");
      return res.json(JSON.parse(data));
    } else {
      console.log("Data not found in cache");
      next();
    }
  } catch (err) {
    console.error("Redis error:", err);
    return res.status(500).send("Internal Server Error");
  }
};

app.get("/", (_, res) => {
  return res.json({ result: "success" });
});

app.get("/posts", cacheMiddleware, async (req, res) => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const posts = await response.data;

  await redisClient.set(req.url, JSON.stringify(posts), {
    EX: 3600,
  });
  return res.json(posts);
});

app.get("/posts/:id", cacheMiddleware, async (req, res) => {
  const { id } = req.params;
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const post = response.data;

  await redisClient.set(req.url, JSON.stringify(post), {
    EX: 3600,
  });
  return res.json(post);
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});
