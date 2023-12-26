const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGODB_URL;

const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB is successfully connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
