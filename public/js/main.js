//final assignment before the final
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


//load the todos and mark complete or not or delete them
async function loadTodos(category) {
    completedTodosListEl.innerHTML = "";
    uncompletedTodosListEl.innerHTML = "";
    categorySelectEl.value = "0";
    const url = category ? `/todos?category=${category}` : "/todos";
    const response = await fetch(url)
    todos = await response.json();

    todos.forEach((todo) => {
        let todoElement;
        if (todo.done === false) {
            todoElement = `
                <li class="uncompleted">
                    <p class="margin-style-todo">${todo.todoName}</p>
                    <div class='actions'>
                        <i onclick='deleteTodo(event)' data-todoid=${todo.todoID} class="fa fa-trash"></i>
                        <a onclick='completeTodo(event)' data-todoid=${todo.todoID} class="complete-button">Complete</a>
                    </div>
                </li>
            `;
            uncompletedTodosListEl.insertAdjacentHTML("beforeend", todoElement);
        } else {
            todoElement = `
                <li class="completed">
                    <p class="complete-decoration margin-style-todo">${todo.todoName}</p>
                    <div class='actions'>
                        <i onclick='deleteTodo(event)' data-todoid=${todo.todoID} class="fa fa-trash"></i>
                        <a onclick='uncompleteTodo(event)' data-todoid=${todo.todoID} class="uncomplete-button">Mark Incomplete</a>
                    </div>
                </li>
            `;
            completedTodosListEl.insertAdjacentHTML("beforeend", todoElement);
        }
    });
    renderUncompletedTodoCount();
}

//delete todos 
async function deleteTodo(event) {
    const todoId = event.target.dataset.todoid;
    await fetch(`/todos/delete/${todoId}`, {
        method: "DELETE",
    })
    const categoryAllRadio = document.getElementById('filter-all');

    if (categoryAllRadio) {
        categoryAllRadio.checked = true;
    }
    loadTodos();
}

//create todo function 
async function createTodo(todoName, categoryID) {
    await fetch("/todos/create", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ todoName, categoryID })
    });
    resetCategoryFilter();
}