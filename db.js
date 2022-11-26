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

let currentCategoryId = categories.length;
let currentTodoId = todos.length;

module.exports = { todos, categories, currentCategoryId, currentTodoId };