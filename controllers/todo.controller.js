import {
    getTodosService,
    createTodoService,
    editTodoService,
    deleteTodoService,
} from "../services/todo.service.js";
import { sendSuccess, sendError } from "../utils/response.js";

export const getTodosController = async (req, res) => {
    try {
        const todos = await getTodosService(req.user._id);
        return sendSuccess(res, 200, "Todos fetched successfully", { todos });
    } catch (err) {
        console.error("Get todos error:", err.message);
        return sendError(res, 500, "Failed to fetch todos");
    }
};

export const createTodoController = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title) {
            return sendError(res, 400, "Title is required");
        }
        
        const todo = await createTodoService(req.user._id, { title, description });
        return sendSuccess(res, 201, "Todo created successfully", { todo });
    } catch (err) {
        console.error("Create todo error:", err.message);
        return sendError(res, 500, "Failed to create todo");
    }
};

export const editTodoController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, isCompleted } = req.body;

        const updated = await editTodoService(req.user._id, id, {
            title,
            description,
            isCompleted,
        });

        if (!updated) {
            return sendError(res, 404, "Todo not found or you don't have permission");
        }

        return sendSuccess(res, 200, "Todo updated successfully", { todo: updated });
    } catch (err) {
        console.error("Edit todo error:", err.message);
        return sendError(res, 500, "Failed to update todo");
    }
};

export const deleteTodoController = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await deleteTodoService(req.user._id, id);

        if (!deleted) {
            return sendError(res, 404, "Todo not found or you don't have permission");
        }

        return sendSuccess(res, 200, "Todo deleted successfully");
    } catch (err) {
        console.error("Delete todo error:", err.message);
        return sendError(res, 500, "Failed to delete todo");
    }
};