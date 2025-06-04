import express from "express";
import { connectClient } from "./config/mongodb_config.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

await connectClient();

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

