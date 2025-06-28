require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/conn");

const Product_Details = require("./models/userSchema");
const Customer_Details = require("./models/customerSchema");
const Review_Details = require("./models/review");
const Order_Details = require("./models/Order");
const cors = require("cors");
const router = require("./Router/router");
const port = 8004;

app.use(cors());
app.use(express.json());
app.use("/files", express.static("files"));

app.use(router);

app.listen(port, () => {
  console.log(`server is start port number ${port}`);
});
