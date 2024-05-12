const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const fs = require("fs");
const saltRound = 10;
// var privateKey = fs.readFileSync("./private.key");

exports.createUser = async (req, res) => {
  try {
    const { email, userName, password, name } = req.body;

    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(409).json({
        success: false,
        message: "User already registered with this email",
      });
    }
    const hashdPassword = bcrypt.hashSync(password, saltRound);
    const token = jwt.sign({ email: email }, process.env.PrivateKey, { expiresIn: "48h" });
    const user = new User({
      email,
      userName,
      password: hashdPassword,
      name,
      token,
    });
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "User Created Successfully", user });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Invalid User" });
    }
    const isValid = bcrypt.compareSync(password, user.password);
    if (isValid) {
      const token = jwt.sign({ email: email }, privateKey, {
        expiresIn: "48h",
      });
      user.token = token;
      await user.save();
      res
        .status(200)
        .json({ success: true, message: "Signin Successfully", token: token });
    } else {
      res.status(401).json({ message: "Invalid User" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};
