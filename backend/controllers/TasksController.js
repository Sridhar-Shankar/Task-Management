const TaskModel = require("../models/TaskModel");

exports.addTask = async (req, res) => {
    const { priority, name, duedate, createdAt, markedValue, taskItems, userId, sectionType } = req.body;
    try {
        const newTask = new TaskModel({ priority, name, duedate, createdAt, markedValue, taskItems, userId, sectionType });
        await newTask.save();
        res.json({ newTask });
    } catch (error) {
        res.json({ message: "An error occurred" });
    }
};

exports.getTasks = async (req, res) => {
    const { id } = req.params;
    const { time } = req.query;
    try {
        const query = { userId: id };
        if (time !== "all") query.createdAt = time;
        const tasks = await TaskModel.find(query);
        res.json({ tasks });
    } catch (error) {
        res.json({ message: "An error occurred" });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await TaskModel.findByIdAndDelete(id);
        res.json({ deletedTask });
    } catch (error) {
        res.json({ message: "An error occurred" });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { priority, name, duedate, markedValue, taskItems, sectionType } = req.body;
    try {
        const updatedTask = await TaskModel.findByIdAndUpdate(id, { priority, name, duedate, markedValue, taskItems, sectionType }, { new: true });
        res.json({ updatedTask });
    } catch (error) {
        res.json({ message: "An error occurred" });
    }
};

exports.getSingleTask = async (req, res) => {
    const { id } = req.params;
    try {
        const singleTask = await TaskModel.findById(id);
        res.json({ singleTask });
    } catch (error) {
        res.json({ message: "An error occurred" });
    }
};
