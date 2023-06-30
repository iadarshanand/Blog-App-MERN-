const express = require("express");
const {
  getAllUser,
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get("/", getAllUser);
userRouter.get("/:id", getUser);
userRouter.post("/signup", registerUser);
userRouter.post("/login", loginUser);

module.exports = userRouter;
