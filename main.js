const express = require("express");
const todosRouter = require("./routes/todos");
const categoriesRouter = require("./routes/categories");
const cors = require("cors");

const app = express();

const PORT = 8000;

app.use(cors());
app.use(express.json());

app.use("/todos", todosRouter);
app.use("/categories", categoriesRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})