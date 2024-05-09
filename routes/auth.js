const User = require("../model/user");

exports.createUser = async (req, res) => {
  try {
    const { email, userName, password } = req.body;
    const user = new User({ email, userName, password });
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "User Created Successfully", user });
  } catch (e) {
    return res.status(400).json({ success: false, error: e.message });
  }
};
