const TaskCheckBox = require("../models/TaskCheckBox");

const addTask = async (req, res) => {
    const { priority, name, duedate, createdAt, markedval, checklistarr, userid, sectiontype } = req.body;
    try {
        const task = new TaskCheckBox({ priority, name, createdAt, duedate, checklistarr, markedval, userid, sectiontype });
        const newTask = await task.save();
        res.status(201).json({ newTask });
    } catch (err) {
        console.error("Error saving task:", err);
        res.status(500).json({ message: "Something went wrong." });
    }
};

const getTasks = async (req, res) => {
    const { id } = req.params;
    const { time } = req.query;
    try {
        const query = { userid: id };
        if (time !== "all") {
            query.createdAt = time;
        }
        const tasks = await TaskCheckBox.find(query);
        res.json({ tasks });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong." });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await TaskCheckBox.findByIdAndDelete(id);
        res.json({ deletedTask });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong." });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { priority, name, duedate, markedval, checklistarr, sectiontype } = req.body;
    try {
        const updateData = {};
        if (priority) updateData.priority = priority;
        if (name) updateData.name = name;
        if (duedate) updateData.duedate = duedate;
        if (markedval) updateData.markedval = markedval;
        if (checklistarr) updateData.checklistarr = checklistarr;
        if (sectiontype) updateData.sectiontype = sectiontype;

        const updatedTask = await TaskCheckBox.findByIdAndUpdate(id, updateData, { new: true });
        res.json({ updatedTask });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong." });
    }
};

const getSingleTask = async (req, res) => {
    const { id } = req.params;
    try {
        const singleTask = await TaskCheckBox.findById(id);
        res.json({ singleTask });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong." });
    }
};

module.exports = {
    addTask,
    getTasks,
    deleteTask,
    updateTask,
    getSingleTask,
};
