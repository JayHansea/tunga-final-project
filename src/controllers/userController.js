const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../utils/auth");

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error); // Pass errors to the error handler middleware
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const token = generateToken(user.id, user.role);
    const { name, role } = user;
    res.status(200).json({ token, user: { id: user.id, name, email, role } });
  } catch (error) {
    next(error); // Pass errors to the error handler middleware
  }
};

module.exports = { register, login };
