const express = require("express");
const router = express.Router();
const TasksController = require("../controllers/TasksController");

router.post("/addtask", TasksController.addTask);
router.get("/gettasks/:id", TasksController.getTasks);
router.delete("/deletetask/:id", TasksController.deleteTask);
router.patch("/updatetask/:id", TasksController.updateTask);
router.get("/getsingleTask/:id", TasksController.getSingleTask);

module.exports = router;
