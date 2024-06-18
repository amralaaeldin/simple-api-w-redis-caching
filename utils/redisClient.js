import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

await redisClient
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

export default redisClient;
