import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_change_in_production";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const signupService = async ({ name, email, password, phone }) => {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const error = new Error("Email is already registered.");
        error.statusCode = 409;
        throw error;
    }

    const user = await User.create({ name, email, password, phone });

    const token = generateToken(user._id);

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
        },
    };
};

export const loginService = async ({ email, password }) => {
    // Explicitly select password since it's select:false in model
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        const error = new Error("Invalid email or password.");
        error.statusCode = 401;
        throw error;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        const error = new Error("Invalid email or password.");
        error.statusCode = 401;
        throw error;
    }

    const token = generateToken(user._id);

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
        },
    };
};