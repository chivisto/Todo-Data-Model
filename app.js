/****** This is a model todo app for assignment 2 ******/
const todoList = document.querySelector('.todoList');

let createTodo = document.querySelector('.createTodo');

let userInput = document.querySelector('.userInput');

let clear = document.querySelector('.clearTodo');

let leftTodo = document.querySelector('.pending');

//the model used
let todos = [
    {
        todoName: 'Go to the gym',
        ID: 0,
        done: true,
        hide: false
    },
    {
        todoName: 'Study for math test',
        ID: 1,
        done: false,
        hide: false
    },
    {
        todoName: 'Play Overwatch 2 ',
        ID: 2,
        done: true,
        hide: false
    }
];

//User input event listener with a click on button
createTodo.addEventListener('click', event => {
    if (userInput.value == '') return;
    addTodo(userInput.value);

    leftTodo.innerHTML = getPendingTasks();
    loadTodos();
})

//create a new todo from user input
const addTodo = name => {
    userInput.value = '';

    let newTodo = {
        ID: todos.length,
        todoName: name,
        done: false,
        hide: false
    }
    todos.push(newTodo);

    leftTodo.innerHTML = getPendingTasks();
    loadTodos();
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
    let todoIndex = todos.findIndex(todo => todo.ID == e);

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
        todos[i].ID = i;
    }
}

//load the todos in the html and bring it all together 
const loadTodos = () => {
    todoList.innerHTML = '';

    todos.forEach(todo => {
        let done = todo.done ? 'done' : '';
        let hide = false;
        let todoElement =
            `<li id="${hide}" class="${done}" data-ID='${todo.ID} '>${todo.todoName} <i class="fa fa-trash"></i> </li>`;
        todoList.insertAdjacentHTML('beforeend', todoElement);
    })
}

leftTodo.innerHTML = getPendingTasks();
loadTodos();
