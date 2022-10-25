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

let clear = document.querySelector('.clearTodo');

let leftTodo = document.querySelector('.pending');



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

