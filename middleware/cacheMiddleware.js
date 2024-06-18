import redisClient from "./../utils/redisClient.js";

export const cacheMiddleware = async (req, res, next) => {
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
