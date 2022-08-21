const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let TodoList = new Schema({
  tasks: { type: [String], required: true },
});

module.exports = mongoose.model("todoList", TodoList);