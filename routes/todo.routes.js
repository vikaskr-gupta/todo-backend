import { Router } from "express";
import {
    getTodosController,
    createTodoController,
    editTodoController,
    deleteTodoController,
} from "../controllers/todo.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

// All todo routes are protected — user must be logged in
router.use(protect);

router.get("/", getTodosController);
router.post("/", createTodoController);
router.put("/:id", editTodoController);
router.delete("/:id", deleteTodoController);

export default router;