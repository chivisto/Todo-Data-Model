# Todo-Data-Model

Isaac Covarrubias

## Project Setup

Install dependencies

```
npm install
```

Run in development mode(using nodemon)

```
npm run dev
```

Run in production mode

```
npm start
```

## TODOS API
### GET Todos
*Description*: Get all todos available

*Method*: ```GET```

*Endpoint*: http://localhost:8000/todos

*Sample Response*

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


*Method*: ```GET```

*Endpoint*: http://localhost:8000/todos/by-category/:categoryId

*Params*: ```INTEGER``` ```categoryId```

*Sample Response*
```json
[
    {
        "todoName": "Go to the gym",
        "todoID": 0,
        "done": true,
        "hide": false,
        "categoryID": 3
    }
]
```

### POST Todos

*Description*: Create a new todo item

*Method*: ```POST```

*Endpoint*: http://localhost:8000/todos/create

*Body*:

```json
{
    "todoName": "Test Todo",
    "categoryID": 2
}
```

*Sample Response*

```json
{
    "todoID": 4,
    "todoName": "Test Todo",
    "done": false,
    "hide": false,
    "categoryID": 2
}
```

### PUT Todos

*Description*: Update an existing todo

*Method*: ```PUT```

*Endpoint*: http://localhost:8000/todos/update/:todoId

*Params*: ```INTEGER``` ```todoId```

*Body*:

```json
{
    "done": true
}
```

*Sample Response*

```json
{
    "todoName": "Study for math test",
    "todoID": 1,
    "done": true,
    "hide": false,
    "categoryID": 2
}
```

### DELETE Todos

*Description*: Delete an existing todo

*Method*: ```DELETE```

*Endpoint*: http://localhost:8000/todos/delete/:todoId

*Params*: ```INTEGER``` ```todoId```

*Sample Response*

```
deleted
```

## CATEGORIES API

### GET Categories

*Description*: Get all categories available

*Method*: ```GET```

*Endpoint*: http://localhost:8000/categories

*Sample Response*

```json
[
    {
        "categoryID": 2,
        "categoryName": "School"
    },
    {
        "categoryID": 3,
        "categoryName": "Self"
    }
]
```

### POST Categories

*Description*: Create a new category

*Method*: ```POST```

*Endpoint*: http://localhost:8000/categories/create

*Body*:

```json
{
    "categoryName": "Test Category"
}
```

*Sample Response*

```json
{
    "categoryID": 4,
    "categoryName": "Test Category"
}
```

### PUT Categories

*Description*: Update an existing category

*Method*: ```PUT```

*Endpoint*: http://localhost:8000/categories/update/:categoryId

*Params*: ```INTEGER``` ```categoryId```

*Body*:

```json
{
    "categoryName": "New Category"
}
```

*Sample Response*

```json
{
    "categoryID": 1,
    "categoryName": "New Category"
}
```

### DELETE Category

*Description*: Delete a category

*Method*: ```DELETE```

*Endpoint*: http://localhost:8000/categories/delete/:categoryId

*Params*: ```INTEGER``` ```categoryId```

*Sample Response*

```
deleted
```