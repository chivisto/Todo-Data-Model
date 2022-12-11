const { Schema, model } = require("mongoose");

const TodoSchema = new Schema({
    todoName: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    }
});

const Todo = model("Todo", TodoSchema);

module.exports = Todo;