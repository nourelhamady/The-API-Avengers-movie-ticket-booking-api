import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";
import{setServers} from "node:dns/promises";
dotenv.config();

const PORT = process.env.PORT || 3000;

setServers(["1.1.1.1","8.8.8.8"]);
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in .env");
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });