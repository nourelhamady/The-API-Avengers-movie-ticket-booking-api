import express  from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRouter from "./routes/auth.router";

dotenv.config();

const app = express();

app.use(express.json());
app.use(authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});