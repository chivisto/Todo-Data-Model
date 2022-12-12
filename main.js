require("dotenv").config();
const express = require("express");
const todosRouter = require("./routes/todos");
const categoriesRouter = require("./routes/categories");
const cors = require("cors");
const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

const app = express();

const PORT = 8000;

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.use("/todos", todosRouter);
app.use("/categories", categoriesRouter);

db.on("error", console.error.bind(console, "connection error: "));

db.once("open", function () {
    console.log("Connected to db successfully. Starting server...");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
});