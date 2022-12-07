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

//load categories that are already premade
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

//have category filters appear on load 
const renderCategoryFilters = (categories) => {
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

//render select on the category
const renderCategorySelect = (categories) =>{
    categorySelectEl.innerHTML = "";
    categories.forEach(category => {
        let categoryElement =
            `<option value="${category.categoryID}" data-categoryID='${category.categoryID} '>${category.categoryName} </option>`;
        categorySelectEl.insertAdjacentHTML('beforeend', categoryElement);
    })
}

//create user when submitted
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

//delete a category function
async function deleteCategory(event) {
    const categoryId = event.target.dataset.categoryid;

    await fetch(`/categories/delete/${categoryId}`, {
        method: "DELETE",
    });
    loadCategories();
}

//mark the todo as complete when click on button
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

//mark the todo as uncomplete when clock on button
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

//reset category filter to default all
const resetCategoryFilter = () => {
    const categoryAllRadio = document.getElementById('filter-all');
    if (categoryAllRadio) {
        categoryAllRadio.checked = true;
    }
}

//select the correct category when clicked on
const getSelectedCategoryInput = () => {
    const selectedCategoryEls = document.querySelectorAll("input[type='radio'][name='selectedCategory']")
    for (const entry of selectedCategoryEls) {
        if (entry.checked) {
            return entry;
        }
    }
    return null;
}

loadTodos();
loadCategories();