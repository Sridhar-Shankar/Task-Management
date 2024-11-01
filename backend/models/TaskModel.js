const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    priority: { type: String, required: true },
    name: { type: String, required: true },
    duedate: { type: String },
    taskItems: { type: Array, required: true },
    markedValue: { type: Number, required: true },
    createdAt: { type: Number, required: true },
    userId: { type: String, required: true },
    sectionType: { type: String, required: true }
});

module.exports = mongoose.model("Task", TaskSchema);
