const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  Name: {
    type: String,
    require: true,
  },
  Email: {
    type: String,
    require: true,
  },
  Phone: {
    type: Number,
    require: true,
  },
  Address: {
    type: String,
    require: true,
  },
  City: {
    type: String,
    require: true,
  },
  PostelCode: {
    type: Number,
    require: true,
  },
  Country: {
    type: String,
    require: true,
  },
  Payment_Type: {
    type: String,
    require: true,
  },
});

const Order_Details = new mongoose.model("Order_Details", orderSchema);
module.exports = Order_Details;
