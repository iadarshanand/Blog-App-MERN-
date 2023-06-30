const bcrypt = require("bcryptjs");
const User = require("../models/user");

const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (e) {
    return console.log(e.message);
  }

  if (!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
  return res.status(200).json({ users });
};

const getUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findById(id);
  } catch (e) {
    return console.log(e.message);
  }
  if (!user) return res.status(404).json({ message: "User does not exist" });
  // console.log(user);

  return res.status(200).json({ user });
};

const registerUser = async (req, res, next) => {
  const { email, password, name } = await req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "Already Registered, Please Login" });
  }
  //otherwise
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({ email, password: hashedPassword, name, blogs: [] });
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Registered Successfully",
    user,
  });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (e) {
    return console.log(e.message);
  }
  if (!existingUser) {
    return res.status(404).json({
      message: "User does not found",
    });
  }
  //otherwise
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: "Incorrect Password",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Login Successfully",
    user: existingUser,
  });
};

module.exports = { getAllUser, registerUser, loginUser, getUser };
