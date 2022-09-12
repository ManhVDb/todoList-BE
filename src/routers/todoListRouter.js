const express = require("express");
const router = express.Router();
const todoListController = require("../app/controllers/todoListController");
router.post("/create-task", todoListController.createTask);
router.get("/get-tasks", todoListController.getTasks);
router.put("/update-tasks", todoListController.updateTask);
router.delete("/delete-task", todoListController.deleteTask);
router.delete("/delete-all-tasks", todoListController.deleteAllTasks);

module.exports = router;