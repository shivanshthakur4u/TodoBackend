const Task = require("../model/Task");

exports.createTask = async (req, res) => {
  try {
    const taskData = {
      title: req.body.title,
      time: new Date(req.body.date + " " + req.body.time),
      description: req.body.description,
      priority: req.body.priority,
      category: req.body.category,
      date: req.body.date,
    };

    const task = new Task(taskData);
    await task.save();
    res.json({ success: true, message: "Task created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllTasks = async (req, res) => {
  if (req.query.q !== "") {
    try {
      const searchQuery = req.query.q;
      const tasks = await Task.find({
        title: { $regex: new RegExp(searchQuery, "i") },
      });
      res.status(200).json({ success: true,  tasks: tasks });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
 else {

  try {
    const tasks = await Task.find().sort([["time", -1]]);
    if (!tasks || tasks.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "No tasks found." });
    } else {
      return res.status(200).json({
        success: true,
        message: "Tasks fetched successfully",
        tasks: tasks,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
}

exports.getTaskById = async (req, res) => {
  try {
    let Id = req.params.id;
    let task = await Task.findOne({ _id: Id });
    if (!task || task.length == 0) {
      return res
        .status(404)
        .json({ success: false, message: "No task exist with this Id" });
    } else if (task) {
      return res
        .status(200)
        .json({ success: true, message: "Task Fetched successfully", task });
    }
  } catch (err) {
    res.status(404).json({ success: false, message: "wrong Id entered" });
  }
};

exports.updatetaskById = async (req, res) => {
  try {
    const Id = req.params.id;
    const task = await Task.findOneAndUpdate(
      { _id: Id },
      { $set: req.body },
      { new: true }
    );
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "No task exist with this Id" });
    } else if (task) {
      return res
        .status(200)
        .json({ success: true, message: "Task updated succssfully", task });
    }
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.deletetaskById = async (req, res) => {
  try {
    const Id = req.params.id;
    const task = await Task.findOneAndDelete({ _id: Id }, { new: true });
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "No task exist with this Id" });
    } else if (task) {
      return res
        .status(200)
        .json({ success: true, message: "Task deleted succssfully", task });
    }
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
