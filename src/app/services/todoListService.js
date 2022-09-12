const TodoList = require("../models/todoList");

class todoService {
  async createTask(nameTask) {
    try {
      const taskNew = new TodoList({
        tasks: [
          {
            task: nameTask,
          },
        ],
      });
      return await TodoList.find()
        .exec()
        .then((todoLists) => {
          if (todoLists[0]?.tasks) {
            todoLists[0]?.tasks.push({ task: nameTask });
            return todoLists[0].save();
          } else {
            return taskNew.save();
          }
        });
    } catch (error) {
      throw error;
    }
  }
  async getTasks(size, page, search) {
    let data;
    try {
      return await TodoList.find()
        .exec()
        .then((todoLists) => {
          let totalPage = this.dataTotalPage(todoLists[0].length, size);
          data = todoLists
          if (page && size) {
            totalPage = this.dataTotalPage(todoLists[0].length, size);
            data = this.pagingData(todoLists[0], size, page);
            return { totalPage, data };
          } else {
            return { totalPage, data };
          }
        });
    } catch (error) {
      throw error;
    }
  }
  async deleteTask(id) {
    try {
      return await TodoList.find()
        .exec()
        .then((todoLists) => {
          if (todoLists[0]?.tasks && todoLists[0]?.tasks.length > 0) {
            todoLists[0]?.tasks.forEach((element, index) => {
              if (element._id == id) {
                if (index > -1) {
                  todoLists[0]?.tasks.splice(index, 1);
                }
              }
            });
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
  dataTotalPage(data, size) {
    if (size == undefined) {
      return 1;
    }
    const totalPage = data / size;
    if (Number.isInteger(totalPage)) {
      return totalPage;
    } else {
      const result = Math.floor(totalPage);
      return result + 1;
    }
  }
  pagingData = (data, size, page) => {
    const pageStart = size * page - size;
    const pageEnd = pageStart + size;
    const result = data.slice(pageStart, pageEnd);
    return result;
  };
}

module.exports = new todoService();
