const todoListService = require("../services/todoListService");
const jsonInstance = require("../utils/JsonUtils");
const responeInstance = require("../utils/ResponeUtils");
class todoController {
  async createTask(req, res) {
    const response = {
      task: req.body.task,
    };
    await todoListService
      .createTask(response.task)
      .then(async (data) => {
        responeInstance.success200(
          res,
          jsonInstance.toJsonWithData(`CREATE TASK SUCCCESS!`, await data)
        );
      })
      .catch((error) => {
        responeInstance.error400(res, jsonInstance.jsonNoData(error.message));
      });
  }
  async getTasks(req,res) {
    const response = {
      size: req.body.size,
      page: req.body.page,
      search: req.body.search,
    };
    try {
      const { totalPage, data } =  await todoListService.getTasks(response.size,response.page,response.search)
      responeInstance.success200(
        res,
        jsonInstance.toJsonWithData(`GET TASK SUCCCESS!`, data, totalPage)
      );
    } catch (error) {
      responeInstance.error400(res, jsonInstance.jsonNoData(error.message));
    }
  }
  async updateTask(req,res) {
    const response = {
      task: req.body.task,
      id: req.body.id
    };
    try {
      const { data } =  await todoListService.updateTask(response.task, response.id)
      responeInstance.success200(
        res,
        jsonInstance.toJsonWithData(`UPDATE TASK SUCCCESS!`, data)
      );
    } catch (error) {
      responeInstance.error400(res, jsonInstance.jsonNoData(error.message));
    }
  }
  async deleteTask(req,res) {
    const response = {
      id: req.body.id,
    };
    await todoListService
      .deleteTask(response.id)
      .then(async (data) => {
        responeInstance.success200(
          res,
          jsonInstance.toJsonWithData(`DELETE TASK SUCCCESS!`, await data)
        );
      })
      .catch((error) => {
        responeInstance.error400(res, jsonInstance.jsonNoData(error.message));
      });
  }
  async deleteAllTasks(req,res) {
    await todoListService
      .deleteAllTasks()
      .then(async (data) => {
        responeInstance.success200(
          res,
          jsonInstance.toJsonWithData(`DELETE ALL TASKS SUCCCESS!`, await data)
        );
      })
      .catch((error) => {
        responeInstance.error400(res, jsonInstance.jsonNoData(error.message));
      });
  }
}

module.exports = new todoController();