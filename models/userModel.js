const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "enter your email address"],
  },
  password: {
    type: String,
    required: [true, "enter your password"],
  },
  firstName: {
    type: String,
    required: [true, "enter your first name"],
  },
  lastName: {
    type: String,
    required: [true, "enter your last name"],
  },
  urgiinOwog: {
    type: String,
    required: [true, "enter your owog"],
  },
  personalId: {
    type: String,
    required: [true, "enter your personalId"],
  },
  gender: {
    type: String,
    required: [true, "enter your gender"],
  },
  origin: {
    type: String,
    required: [true, "enter your origin"],
  },
  address: {
    type: String,
    required: [true, "enter your address"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const users = mongoose.model("users", userSchema);

module.exports = users;
