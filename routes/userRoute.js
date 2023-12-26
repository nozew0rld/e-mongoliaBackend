const { Router } = require("express");

const {
  getUsers,
  getUsersByEmail,
  createUser,
  login,
  deleteUser,
} = require("../controller/userController");

const userRouter = Router();

userRouter
  .get("/", getUsers)
  .get("/checkEmail/:id", getUsersByEmail)
  .post("/createUser", createUser)
  .post("/login", login)
  .delete("/deleteUser/:id", deleteUser);

module.exports = userRouter;
