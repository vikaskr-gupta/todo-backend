import { signupService, loginService } from "../services/auth.service.js";
import { sendSuccess, sendError } from "../utils/response.js";

export const signupController = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return sendError(res, 400, "All fields are required: name, email, password, phone");
    }

    const result = await signupService({ name, email, password, phone });
    return sendSuccess(res, 201, "Account created successfully", result);
  } catch (err) {
    console.error("Signup error:", err.message);
    return sendError(res, err.statusCode || 500, err.message);
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 400, "Email and password are required");
    }

    const result = await loginService({ email, password });
    return sendSuccess(res, 200, "Logged in successfully", result);
  } catch (err) {
    console.error("Login error:", err.message);
    return sendError(res, err.statusCode || 500, err.message);
  }
};

// Get currently logged-in user's profile
export const getMeController = (req, res) => {
  return sendSuccess(res, 200, "User profile fetched", {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    phone: req.user.phone,
  });
};