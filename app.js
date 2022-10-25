/****** This is a model todo app for assignment 2 ******/
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

const todoList = document.querySelector('.todoList');

let createTodo = document.querySelector('.createTodo');

let userInput = document.querySelector('.userInput');

//User input event listener with a click on button
createTodo.addEventListener('click', event => {
    if (userInput.value == '') return;
    addTodo(userInput.value);

    leftTodo.innerHTML = getPendingTasks();
    loadTodos();
})