import express from "express";
import dbConnect from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import todoRoutes from "./routes/todo.routes.js";

dbConnect();

const app = express();
const PORT = process.env.PORT || 3076;

app.use(express.json());

// Health check
app.get("/", (req, res) => {
    res.json({ success: true, message: "Todo API is running 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
});

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});