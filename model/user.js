const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
  },
  token: String,
  list: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Task",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
