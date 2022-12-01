let { todos, currentTodoId } = require("../db")

const getTodos = (req, res) => {
    res.json(todos);
}

const postTodo = (req, res) => {
    const { todoName, categoryID } = req.body;
    currentTodoId++;
    const newTodo = {
        todoID: currentTodoId,
        todoName,
        done: false,
        hide: false,
        categoryID
    }
    todos.push(newTodo);
    return res.status(201).json(newTodo);
}

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

const deleteTodo = (req, res) => {
    const { todoId } = req.params;
    const selectedTodoIndex = todos.findIndex((todo) => todo.todoID === +todoId);
    todos.splice(selectedTodoIndex, 1);
    return res.status(200).json("deleted");
}

const getTodosByCategory = (req, res) => {
    const { categoryId } = req.params;
    const filteredTodos = todos.filter(todo => todo.categoryID === +categoryId);
    return res.status(200).json(filteredTodos);
}

module.exports = {
    getTodos,
    postTodo,
    putTodo,
    deleteTodo,
    getTodosByCategory
}