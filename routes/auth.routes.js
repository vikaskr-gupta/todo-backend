import { Router } from "express";
import {
    signupController,
    loginController,
    getMeController,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

// Public routes
router.post("/signup", signupController);
router.post("/login", loginController);

// Protected route - requires valid JWT
router.get("/me", protect, getMeController);

export default router;