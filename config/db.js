import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(
            process.env.MONGO_URI || "mongodb://127.0.0.1:27017/todo_app"
        );
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        console.error("DB connection error:", err.message);
        process.exit(1);
    }
};

export default dbConnect;