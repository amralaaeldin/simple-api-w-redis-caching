import { Router } from "express";
import dotenv from "dotenv";
import axios from "axios";

import { cacheMiddleware } from "../middleware/cacheMiddleware.js";
import redisClient from "./../utils/redisClient.js";

const router = Router();
dotenv.config();

router.get("/posts", cacheMiddleware, async (req, res) => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const posts = await response.data;

  await redisClient.set(req.url, JSON.stringify(posts), {
    EX: process.env.REDIS_EXPIRATION_TIME,
  });
  return res.json(posts);
});

router.get("/posts/:id", cacheMiddleware, async (req, res) => {
  const { id } = req.params;
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const post = response.data;

  await redisClient.set(req.url, JSON.stringify(post), {
    EX: process.env.REDIS_EXPIRATION_TIME,
  });
  return res.json(post);
});

export default router;
