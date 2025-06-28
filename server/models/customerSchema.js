const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  Customer_Name: {
    type: String,
    require: true,
  },
  Customer_Email: {
    type: String,
    require: true,
  },
  Customer_Message: {
    type: String,
    require: true,
  },
});

const Customer_Details = new mongoose.model("Customer_Details", customerSchema);
module.exports = Customer_Details;
