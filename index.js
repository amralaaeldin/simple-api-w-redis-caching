import express from "express";
import dotenv from "dotenv";

import postsRoutes from "./routes/posts.js";

const app = express();
dotenv.config();

app.get("/", (_, res) => {
  return res.json({ result: "success" });
});

app.use("/api/posts", postsRoutes);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
