// let { todos, currentTodoId } = require("../db")
const Todo = require("../models/todo");
const { formatMongooseResponse } = require("../utils");
/**
 * @param {Request} req 
 * @param {Response} res 
 */
const getTodos = async (req, res) => {
    const { category } = req.query;
    if(category) {
        const todos = await Todo.find({
            category
        });
        return res.json(formatMongooseResponse(todos));
    }
    const todos = await Todo.find({});
    return res.json(formatMongooseResponse(todos));
}

/**
 * @param {Request} req 
 * @param {Response} res 
 */
const postTodo = async (req, res) => {
    const { todoName, categoryID } = req.body;
    let todo = new Todo({
        todoName,
        category: categoryID,
        done: false
    });
    todo = await todo.save();
    return res.status(201).json(formatMongooseResponse(todo));
}

/**
 * @param {Request} req 
 * @param {Response} res 
 */
const putTodo = async (req, res) => {
    const { todoId } = req.params;
    const newData = req.body;
    await Todo.updateOne({
        _id: todoId
    }, {
        $set: {
            ...newData
        }
    });
    const todo = await Todo.findById(todoId);
    return res.status(200).json(formatMongooseResponse(todo));

}

/**
 * @param {Request} req 
 * @param {Response} res 
 */
const deleteTodo = async (req, res) => {
    const { todoId } = req.params;
    await Todo.deleteOne({
        _id: todoId
    });
    return res.status(200).json("deleted");
}

/**
 * @param {Request} req 
 * @param {Response} res 
 */
const getTodosByCategory = async (req, res) => {
    const { categoryId } = req.params;
    const todos = await Todo.find({
        category: categoryId
    });
    return res.status(200).json(formatMongooseResponse(todos));
}

/**
 * @param {Request} req 
 * @param {Response} res 
 */
const clearDone = async (req, res) => {
    await Todo.deleteMany({
        done: true
    });
    return res.status(200).json("Cleared");
}

module.exports = {
    getTodos,
    postTodo,
    putTodo,
    deleteTodo,
    getTodosByCategory,
    clearDone
}