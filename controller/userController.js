const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userModel = require("../models/userModel");
const asyncHandler = require("../middleWare/asyncHandler");

const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await userModel.find();
  res.status(200).json({
    isDone: true,
    data: users,
    message: "successfully fetched users",
  });
});

exports.getUsersByEmail = asyncHandler(async (req, res, next) => {
  const user = await userModel.find({
    email: req.params.id,
  });
  res.status(200).json({
    isDone: true,
    data: user[0],
    message: "successfully fetched user",
  });
});

exports.createUser = asyncHandler(async (req, res, next) => {
  const {
    email,
    password,
    firstName,
    lastName,
    urgiinOwog,
    personalId,
    gender,
    origin,
    address,
    createdAt,
  } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    res.send("already logged in");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await userModel.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    urgiinOwog,
    personalId,
    gender,
    origin,
    address,
    createdAt,
  });

  res.status(200).json({
    isDone: true,
    data: newUser,
    message: "successfully created user",
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email });
  if (!user) {
    return res.status(404).json({
      message: "email not found",
    });
  }
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(404).json({
      message: "password is incorrect",
    });
  }

  const token = jwt.sign({ user: user.email }, ACCESS_TOKEN_KEY);

  return res.status(200).json({
    isDone: true,
    token: token,
    message: "successfully logged in",
    id: user.id,
  });
});

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      isDone: true,
      Data: deletedUser,
      message: "successfully deleted user",
    });
  } catch (err) {
    res.status(400).json({
      isDone: false,
      error: err,
    });
  }
};
