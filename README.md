# Todo-Data-Model
Isaac Covarrubias

## Project Setup
*   Create a .env file in the project's root folder
*   Add this variable to the .env file ```DB_URL = "mongodb_connection_string_here" ```

Install dependencies

```npm install```

Run in development mode(using nodemon)

```npm run dev```

Run in production mode

```npm start```

http://localhost:8000

## TODOS API

### GET Todos
*Description*: Get all todos available

*Endpoint*: http://localhost:8000/todos

```json
[
   {
        "todoName": "Go to the gym",
        "todoID": 0,
        "done": true,
        "hide": false,
        "categoryID": 3
    },
    {
        "todoName": "Study for math test",
        "todoID": 1,
        "done": false,
        "hide": false,
        "categoryID": 2
    } 
]

```

### GET Todos By Category
*Description*: Get todos by category id

*Endpoint*: http://localhost:8000/todos/by-category/:categoryId

### POST Todos
*Description*: Create a new todo item

*Endpoint*: http://localhost:8000/todos/create

### PUT Todos
*Description*: Update an existing todo

*Endpoint*: http://localhost:8000/todos/update/:todoId

### DELETE Todos
*Description*: Delete an existing todo

*Endpoint*: http://localhost:8000/todos/delete/:todoId

## CATEGORIES API

### GET Categories
*Description*: Get all categories available

*Endpoint*: http://localhost:8000/categories


### POST Categories
*Description*: Create a new category

*Endpoint*: http://localhost:8000/categories/create

### PUT Categories
*Description*: Update an existing category

*Endpoint*: http://localhost:8000/categories/update/:categoryId

### DELETE Category
*Description*: Delete a category

*Endpoint*: http://localhost:8000/categories/delete/:categoryId
