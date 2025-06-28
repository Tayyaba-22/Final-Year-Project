const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Product_Title: {
    type: String,
    require: true,
  },
  Short_Description: {
    type: String,
    require: true,
  },
  Description: {
    type: String,
    require: true,
  },
  Price: {
    type: Number,
    require: true,
  },
  Category: {
    type: String,
    require: true,
  },
  Product_Image: {
    data: Buffer,
    type: String,
  },
});

const Product_Details = new mongoose.model("Product_Details", userSchema);
module.exports = Product_Details;
