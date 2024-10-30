const router = require("express").Router();
const {
    addTask,
    getTasks,
    deleteTask,
    updateTask,
    getSingleTask
} = require("../controllers/taskController");

router.post("/addtask", addTask);

router.get("/gettasks/:id", getTasks);

router.delete("/deletetask/:id", deleteTask);

router.patch("/updatetask/:id", updateTask);

router.get("/getsingletask/:id", getSingleTask);

module.exports = router;
