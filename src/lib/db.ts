import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL;
if (!MONGODB_URI) {
    throw new Error("Please define the DATABASE_URL environment variable.");
}

const DBConnect = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

export default DBConnect;
