const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let TodoList = new Schema({
  tasks: {
    type: [
      {
        task: { type: String, required: true },
      },
    ],
    required: true,
  },
});

module.exports = mongoose.model("todoList", TodoList);
