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

categoryCreateForm.onsubmit = async function (e) {
    e.preventDefault();
    let categoryName = categoryNameInput.value;
    await createCategory(categoryName);
    categoryCreateForm.reset();
}

clearDoneBtn.onclick = clearDone;

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

async function loadCategories() {
    categoriesListEl.innerHTML = "";
    const response = await fetch("/categories")
    categories = await response.json();
    categories.forEach((category) => {
        let categoryElement = `
            <li>
                ${category.categoryName}
                <input class="edit-input"
                    type="text"
                    placeholder="Type to Edit"
                    id='category-${category.categoryID}'
                    />
                    <div class='actions'>
                        <i onclick='editCategory(event)' data-categoryid=${category.categoryID} class="fa fa-edit"></i>
                        <i onclick='deleteCategory(event)' data-categoryid=${category.categoryID} class="fa fa-trash"></i>
                    </div>
            </li>
        `;
        categoriesListEl.insertAdjacentHTML("beforeend", categoryElement);
    });
    renderCategoryFilters(categories);
    renderCategorySelect(categories);
}

function renderCategoryFilters(categories) {
    categoryFilterEl.innerHTML = "";
    categoryFilterEl.insertAdjacentHTML("beforeend", `
    <div class="categoryFilterContainer">
        <input 
            onchange='handleCategoryFilterChange(event)'
            id='filter-all'
            name="selectedCategory" 
            type="radio" 
            value="0"/>
        <label for="filter-all">All</label>
      </div>
    `);
    categories.forEach(category => {
        let categoryElement = `
        <div class="categoryFilterContainer">
            <input 
                onchange='handleCategoryFilterChange(event)'
                data-categoryID='${category.categoryID}'
                id='filter-${category.categoryID}' 
                name="selectedCategory" 
                type="radio"
                value="${category.categoryID}"/>
            <label for='filter-${category.categoryID}'>${category.categoryName}</label>
        </div>
        `;
        categoryFilterEl.insertAdjacentHTML("beforeend", categoryElement);
    });
}

function renderCategorySelect(categories) {
    categorySelectEl.innerHTML = "";
    categories.forEach(category => {
        let categoryElement =
            `<option value="${category.categoryID}" data-categoryID='${category.categoryID} '>${category.categoryName} </option>`;
        categorySelectEl.insertAdjacentHTML('beforeend', categoryElement);
    })
}

async function createCategory(categoryName) {
    const response = await fetch("/categories/create", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            categoryName
        })
    })
    await response.json();
    loadCategories();
}

async function deleteCategory(event) {
    const categoryId = event.target.dataset.categoryid;

    await fetch(`/categories/delete/${categoryId}`, {
        method: "DELETE",
    });
    loadCategories();
}

async function editCategory(event) {
    const categoryId = event.target.dataset.categoryid;
    const categoryName = document.getElementById(`category-${categoryId}`).value;

    if (categoryName.trim() === "") {
        return;
    }
    await fetch(`/categories/update/${categoryId}`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            categoryName
        }),
    });
    loadCategories();
}

async function completeTodo(event) {
    const selectedCategoryEl = getSelectedCategoryInput();
    const todoId = event.target.dataset.todoid;
    console.log(selectedCategoryEl)
    await fetch(`/todos/update/${todoId}`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            done: true
        })
    })

    if (selectedCategoryEl && selectedCategoryEl.value != "0") {
        loadTodos(selectedCategoryEl.value);
        return;
    }
    loadTodos();
}

async function uncompleteTodo(event) {
    const selectedCategoryEl = getSelectedCategoryInput();
    const todoId = event.target.dataset.todoid;
    await fetch(`/todos/update/${todoId}`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            done: false
        })
    });
    console.log(selectedCategoryEl)
    if (selectedCategoryEl && selectedCategoryEl.value != "0") {
        loadTodos(selectedCategoryEl.value);
        return;
    }
    loadTodos();
}

function resetCategoryFilter() {
    const categoryAllRadio = document.getElementById('filter-all');
    if (categoryAllRadio) {
        categoryAllRadio.checked = true;
    }
}

function getSelectedCategoryInput() {
    const selectedCategoryEls = document.querySelectorAll("input[type='radio'][name='selectedCategory']")
    for (const entry of selectedCategoryEls) {
        if (entry.checked) {
            return entry;
        }
    }
    return null;
}

const renderUncompletedTodoCount = () => {
    const uncompletedTodos = todos.filter(todo => todo.done === false);
    pendingEl.innerHTML = uncompletedTodos.length;
}

const handleCategoryFilterChange = (event) => {
    const categoryId = +event.target.dataset.categoryid;
    loadTodos(categoryId);
}

async function clearDone() {
    let selectedCategory = null;
    const selectedCategoryEl = getSelectedCategoryInput();
    if (selectedCategoryEl && selectedCategoryEl.value != "0") {
        selectedCategory = selectedCategoryEl.value;
    }
    const url = selectedCategory === null ? "/todos/clear-done" : `/todos/clear-done?categoryId=${selectedCategory}`;
    console.log(url)
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    resetCategoryFilter();
    loadTodos();
}

loadTodos();
loadCategories();