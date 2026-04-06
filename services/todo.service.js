import Todo from "../models/todo.model.js";

export const getTodosService = async (userId) => {
    return await Todo.find({ user: userId }).sort({ createdAt: -1 });
};

export const createTodoService = async (userId, { title, description }) => {
    return await Todo.create({ title, description, user: userId });
};

export const editTodoService = async (userId, todoId, updatedData) => {
    // Only update if todo belongs to this user
    const updated = await Todo.findOneAndUpdate(
        { _id: todoId, user: userId },
        updatedData,
        { new: true, runValidators: true }
    );
    return updated;
};

export const deleteTodoService = async (userId, todoId) => {
    return await Todo.findOneAndDelete({ _id: todoId, user: userId });
};