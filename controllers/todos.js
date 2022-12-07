let { todos, currentTodoId } = require("../db")

/**
 * @param {Request} req 
 * @param {Response} res 
 */
const getTodos = (req, res) => {
    const { category } = req.query;
    if (category) {
        let data = todos.filter((cat) => cat.categoryID === +category);
        return res.json(data);
    }
    return res.json(todos);
}


/**
 * @param {Request} req 
 * @param {Response} res 
 */
const postTodo = (req, res) => {
    const { todoName, categoryID } = req.body;
    currentTodoId++;
    const newTodo = {
        todoID: +currentTodoId,
        todoName,
        done: false,
        hide: false,
        categoryID
    }
    todos.push(newTodo);
    return res.status(201).json(newTodo);
}

/**
 * @param {Request} req 
 * @param {Response} res 
 */
const putTodo = (req, res) => {
    const { todoId } = req.params;
    const newData = req.body;
    const selectedTodoIndex = todos.findIndex((todo) => todo.todoID === +todoId);
    todos.splice(selectedTodoIndex, 1, {
        ...todos[selectedTodoIndex],
        ...newData
    });

    return res.status(200).json(todos[selectedTodoIndex]);

}

/**
 * @param {Request} req 
 * @param {Response} res 
 */
const deleteTodo = (req, res) => {
    const { todoId } = req.params;
    const selectedTodoIndex = todos.findIndex((todo) => todo.todoID === +todoId);
    todos.splice(selectedTodoIndex, 1);
    return res.status(200).json("deleted");
}

/**
 * @param {Request} req 
 * @param {Response} res 
 */
const getTodosByCategory = (req, res) => {
    const { categoryId } = req.params;
    const filteredTodos = todos.filter(todo => todo.categoryID === +categoryId);
    return res.status(200).json(filteredTodos);
}

/**
 * @param {Request} req 
 * @param {Response} res 
 */
const clearDone = (req, res) => {
    todos = todos.filter(todo => todo.done === false);
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