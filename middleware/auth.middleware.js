import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { sendError } from "../utils/response.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const protect = async (req, res, next) => {
    try {
        // 1. Get token from Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return sendError(res, 401, "Not authorized. No token provided.");
        }

        const token = authHeader.split(" ")[1];

        // 2. Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // 3. Attach user to request (exclude password)
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return sendError(res, 401, "User no longer exists.");
        }

        req.user = user;
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return sendError(res, 401, "Token expired. Please login again.");
        }
        return sendError(res, 401, "Invalid token.");
    }
};