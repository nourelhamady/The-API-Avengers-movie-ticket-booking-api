import mongoose from "mongoose";

export const connectDB = () => {
    return mongoose
        .connect(process.env.MONGODB_URI!)
        .then(() => {
            console.log("MongoDB connected successfully");
        })
        .catch((error) => {
            console.error("MongoDB connection failed:", error);
        });
};