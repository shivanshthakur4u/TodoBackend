const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Model = mongoose.model;

const taskSchema = new Schema({
  title: {
    type: String,
    minlength: [5, "Title cannot be less than 5 Characters"],
    maxlength: [25, "Title cannot be more than 25 Characters"],
    unique: true,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  description: {
    type: String,
    minlength: [5, "Description cannot be less than 5 words"],
    maxlength: [50, "Description cannot be more than 15 words"],
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  user:[{
    type:mongoose.Types.ObjectId,
    ref:"User"
  }]
});

const Task = Model("Task", taskSchema);
module.exports = Task;
