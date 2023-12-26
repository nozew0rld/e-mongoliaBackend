const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connect = require("./config/DB");
const userRouter = require("./routes/userRoute.js");

const port = process.env.PORT;

const app = express();
connect();
app.use(express.json());
app.use(cors());

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`server is ${port} starting`);
});
