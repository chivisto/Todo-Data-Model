const express = require("express");
const { getTodos, postTodo, putTodo, deleteTodo, getTodosByCategory, clearDone } = require("../controllers/todos");

const router = express.Router();

router.get("/", getTodos);

router.get("/by-category/:categoryId", getTodosByCategory);

router.post("/create", postTodo);

router.put("/update/:todoId", putTodo);

router.delete("/delete/:todoId", deleteTodo);

router.delete("/clear-done", clearDone);

module.exports = router;