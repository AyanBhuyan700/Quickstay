import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            console.error("MONGODB_URI is not defined in environment variables!");
            return;
        }

        mongoose.connection.on("connected", () => {
            console.log("MongoDB Database Connected successfully");
        });

        mongoose.connection.on("error", (err) => {
            console.warn("MongoDB connection warning:", err.message);
        });

        mongoose.connection.on("disconnected", () => {
            console.warn("MongoDB disconnected");
        });

        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
        });
    } catch (err) {
        console.error("MongoDB initial connection error:", err.message);
    }
};

export default connectDB;