/****** This is a model todo app with categories for assignment 3 ******/
const todoList = document.querySelector('.todoList');

let createTodo = document.querySelector('.createTodo');

let userInput = document.querySelector('.userInput');

let clear = document.querySelector('.clearTodo');

let leftTodo = document.querySelector('.pending');

let createCategory = document.querySelector(".createCategory");

let categoryName = document.querySelector(".categoryName");

let categoryList = document.querySelector(".categoryList");

let categorySelect = document.querySelector(".categorySelect");

let categoryFilter = document.querySelector(".categoryFilter");

//the model used for Categories 
let categories = [
    {
        categoryID: 1,
        categoryName: "Games"
    },
    {
        categoryID: 2,
        categoryName: "School"
    },
    {
        categoryID: 3,
        categoryName: "Self"
    }
]

let currentCategoryId = categories.length;

//the model used for Todos
let todos = [
    {
        todoName: 'Go to the gym',
        todoID: 0,
        done: true,
        hide: false,
        categoryID: 3
    },
    {
        todoName: 'Study for math test',
        todoID: 1,
        done: false,
        hide: false,
        categoryID: 2
    },
    {
        todoName: 'Play Overwatch 2 ',
        todoID: 2,
        done: true,
        hide: false,
        categoryID: 1
    }
];

//User input event listener with a click on button
createTodo.addEventListener('click', event => {
    if (userInput.value == '') return;

    addTodo(userInput.value, +categorySelect.value);

    leftTodo.innerHTML = getPendingTasks();
    loadTodos();
})

//clear todo when click on button
clear.addEventListener('click', event => {
    clearDone();
})

//event listener to create the new category 
createCategory.addEventListener("click", event => {
    if (categoryName.value === '') return;
    addCategory(categoryName.value);
    categoryName.value = "";
})

//create a new todo from user input
const addTodo = (name, categoryID) => {
    userInput.value = '';
    let newTodo = {
        todoID: todos.length,
        todoName: name,
        done: false,
        hide: false,
        categoryID
    }
    todos.push(newTodo);

    leftTodo.innerHTML = getPendingTasks();
    loadTodos();
}

//push category into the model 
const addCategory = name => {
    currentCategoryId++;
    let newCategory = {
        categoryID: currentCategoryId,
        categoryName: name
    }
    categories.push(newCategory);
    loadCategories();
    loadCategorySelect();
    loadCategoryFilters();
}

//load the categories in model to the user
const loadCategorySelect = () => {
    categorySelect.innerHTML = "";

    categories.forEach(category => {
        let categoryElement =
            `<option value="${category.categoryID}" data-categoryID='${category.categoryID} '>${category.categoryName} </option>`;
        categorySelect.insertAdjacentHTML('beforeend', categoryElement);
    })
}

//complete todo
todoList.addEventListener('click', event => {
    if (!event.target.dataset.todoid) {
        event.path.forEach(tag => {
            if (tag.localName == 'li') {
                deleteTodo(tag.dataset.todoid);
            };
        })
    }
    else {
        completeTodo(event.target.dataset.todoid);
    }
})

//function to complete todo
const completeTodo = e => {
    let todoIndex = todos.findIndex(todo => todo.todoID == e);

    todos[todoIndex].done = !todos[todoIndex].done;

    leftTodo.innerHTML = getPendingTasks();
    loadTodos();
}

//delete todos
const deleteTodo = e => {
    todos.splice(e, 1);

    reassignIDs();
    leftTodo.innerHTML = getPendingTasks();
    loadTodos();
}

//get pending todos
const getPendingTasks = () => {
    let count = 0;

    todos.forEach(todo => {
        if (!todo.done) count++;
    })
    return count;
}

//find which ones are done and then clear them
const clearDone = () => {
    let i = todos.length
    while (i--) {
        if (todos[i].done) {
            todos.splice(i, 1);
        }
    }

    leftTodo.innerHTML = getPendingTasks();
    loadTodos();
}

//reassign todo ID if they are deleted or completed
const reassignIDs = () => {
    for (let i = 0; i < todos.length; i++) {
        todos[i].todoID = i;
    }
}

//load the todos in the html and bring it all together 
const loadTodos = (selectedCategory = 0) => {
    todoList.innerHTML = '';

    todos.forEach(todo => {
        let done = todo.done ? 'done' : '';
        let hide = false;
        let todoElement =
            `<li id="${hide}" class="${done}" data-todoID='${todo.todoID} '>${todo.todoName} <i class="fa fa-trash"></i> </li>`;
        if(todo.categoryID === selectedCategory) {
            todoList.insertAdjacentHTML('beforeend', todoElement);
        } else if(selectedCategory === 0) {
            todoList.insertAdjacentHTML('beforeend', todoElement);
        }
    })
}

//delete category function
const deleteCategory = (event) => {
    const categoryId = event.target.dataset.categoryid;
    categories = categories.filter(c => +c.categoryID !== +categoryId);

    loadCategories();
    loadCategorySelect();
    loadCategoryFilters();
}

//edit categories that are there
const editCategory = (event) => {
    const categoryId = +event.target.dataset.categoryid;

    const newName = document.getElementById(`category-${categoryId}`).value;

    const categoryIndex = categories.findIndex(c => c.categoryID === categoryId);

    const category = categories[categoryIndex];

    categories.splice(categoryIndex, 1, {
        ...category,
        categoryName: newName
    })

    loadCategories();
    loadCategorySelect();
    loadCategoryFilters();
}

//change filters when clicked on
const handleCategoryFilterChange = (event) => {
    const categoryId = +event.target.dataset.categoryid;

    loadTodos(categoryId);
}

//load the categories filters and display them in HTML
const loadCategoryFilters = () =>{
    categoryFilter.innerHTML = "";
    categoryFilter.insertAdjacentHTML("beforeend", `
    <div class="categoryFilterContainer">
        <input 
            onchange='handleCategoryFilterChange(event)'
            data-categoryID='0'
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
                name="selectedCategory" type="radio" 
                value="${category.categoryID}"/>
            <label for='filter-${category.categoryID}'>${category.categoryName}</label>
        </div>
        `;
        categoryFilter.insertAdjacentHTML("beforeend", categoryElement);
    });
}

//load categories after the model ones
const loadCategories = () => {
    categoryList.innerHTML = '';
    categories.forEach(category => {
        let categoryElement =
            `<li id="${category.categoryID}" data-categoryID='${category.categoryID}'>
                ${category.categoryName}
                <input id='category-${category.categoryID}' placeholder='Edit Category' style='margin-left:1rem;margin-right:1rem'/>
                <i onclick='editCategory(event)' data-categoryid=${category.categoryID} class="fa fa-edit"></i>
                <i onclick='deleteCategory(event)' data-categoryid=${category.categoryID} class="fa fa-trash"></i>
            </li>`;
        categoryList.insertAdjacentHTML('beforeend', categoryElement);
    })
}

leftTodo.innerHTML = getPendingTasks();
loadTodos();
