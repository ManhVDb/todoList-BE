const TodoList = require("../models/todoList");

class todoService {
  async createTask(nameTask) {
    try {
      const taskNew = new TodoList({
        tasks: [nameTask],
      });
      return await TodoList.find()
        .exec()
        .then((todoLists) => {
          if (todoLists[0]?.tasks) {
            todoLists[0]?.tasks.push(nameTask);
            return todoLists[0].save();
          } else {
            return taskNew.save();
          }
        });
    } catch (error) {
      throw error;
    }
  }
  async getTasks(size, page) {
    try {
      return await TodoList.find()
        .skip(size * page - size)
        .limit(size)
        .exec()
        .then((todoLists) => {
          return todoLists;
        });
    } catch (error) {
      throw error;
    }
  }
  async deleteTask(taskName) {
    try {
      return await TodoList.find()
        .exec()
        .then((todoLists) => {
          if (todoLists[0]?.tasks && todoLists[0]?.tasks.length > 0) {
            const index = todoLists[0]?.tasks.indexOf(taskName);
            if (index > -1) {
              todoLists[0]?.tasks.splice(index, 1);
            }
            return todoLists[0].save();
          } else {
            throw new Error("No task exists");
          }
        });
    } catch (error) {
      throw error;
    }
  }
  async deleteAllTasks() {
    try {
      return await TodoList.find()
        .exec()
        .then((todoLists) => {
          if (todoLists[0]?.tasks && todoLists[0]?.tasks.length > 0) {
            todoLists[0].tasks = [];
            return todoLists[0].save();
          } else {
            throw new Error("No task exists");
          }
        });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new todoService();
