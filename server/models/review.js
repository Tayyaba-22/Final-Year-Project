const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  Rating: {
    type: String,
    require: true,
  },
  Name: {
    type: String,
    require: true,
  },
  Review: {
    type: String,
    require: true,
  },
});

const Review_Details = new mongoose.model("Review_Details", reviewSchema);
module.exports = Review_Details;
