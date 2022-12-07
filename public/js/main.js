const uncompletedTodosListEl = document.getElementById("uncompleted-todos-list");

const completedTodosListEl = document.getElementById("completed-todos-list");

const categoriesListEl = document.getElementById("categories-list");

const categoryCreateForm = document.getElementById("category-create-form");

const categoryNameInput = document.getElementById("category-name-input");

const categoryFilterEl = document.querySelector(".categoryFilter");

const categorySelectEl = document.querySelector(".categorySelect");

const createTodoBtn = document.querySelector(".createTodo");

const todoNameInputEl = document.querySelector(".todo-name-input");

const pendingEl = document.querySelector(".pending");

const clearDoneBtn = document.querySelector(".clearTodo");

let todos = [];
let categories = [];

//create the category form
categoryCreateForm.onsubmit = async function (e) {
    e.preventDefault();
    let categoryName = categoryNameInput.value;
    await createCategory(categoryName);
    categoryCreateForm.reset();
}

//create the todo button
createTodoBtn.onclick = async function () {
    const todoName = todoNameInputEl.value;

    if (todoName.trim() === "") {
        return;
    }

    const categoryID = categorySelectEl.value;
    await createTodo(todoName, +categoryID);
    loadTodos();
    todoNameInputEl.value = "";
}

