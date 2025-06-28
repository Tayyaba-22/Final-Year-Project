const express = require("express");
const multer = require("multer");
const path = require("path");
const Product_Details = require("../models/userSchema");
const Customer_Details = require("../models/customerSchema");
const Order_Details = require("../models/Order");
const Review_Details = require("../models/review");
const router = express.Router();

const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files");
  },
  filename: function (req, file, cb) {
    const ext = Date.now();
    cb(null, ext + file.originalname);
  },
});

const upload2 = multer({ storage: storage2 });
router.post("/Productdatadetail", upload2.single("file"), async (req, res) => {
  const title = req.body.title;
  console.log(title);
  const title2 = req.body.title2;
  console.log(title2);
  const title3 = req.body.title3;
  console.log(title3);
  const title4 = req.body.title4;
  console.log(title4);
  const title5 = req.body.title5;
  console.log(title5);
  const filename = req.file.filename;
  console.log("filename", filename);
  try {
    await Product_Details.create({
      Product_Title: title,
      Short_Description: title2,
      Description: title3,
      Price: title4,
      Category: title5,
      Product_Image: filename,
    });

    res.status(201).send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});
router.get("/getProductdatadetail", async (req, res) => {
  try {
    const getuser = await Product_Details.find();
    res.status(201).json(getuser);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.delete("/Productdeletedetail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteuser = await Product_Details.findByIdAndDelete({ _id: id });
    res.status(201).json(deleteuser);
  } catch (error) {
    res.status(400).json(error);
  }
});

//

router.post("/Customerdatadetail", async (req, res) => {
  const { Customer_Name, Customer_Email, Customer_Message } = req.body;

  if (!Customer_Name || !Customer_Email || !Customer_Message) {
    res.status(400).json("Please fill the data");
  }
  try {
    // const peruser = await Task_Details.findOne({ Email: Email });
    // if (peruser) {
    //   res.status(400).json("This user is already present");
    // } else {
    const adduser = new Customer_Details({
      Customer_Name,
      Customer_Email,
      Customer_Message,
    });
    await adduser.save();
    res.status(201).json(adduser);
    // }
  } catch (error) {
    res.status(400).json(error);
  }
});
router.get("/Customerdatadetail", async (req, res) => {
  try {
    const getuser = await Customer_Details.find();
    res.status(201).json(getuser);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.delete("/Customerdeletedetail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteuser = await Customer_Details.findByIdAndDelete({ _id: id });
    res.status(201).json(deleteuser);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.post("/Reviewdatadetail", async (req, res) => {
  const { Rating, Name, Review } = req.body;

  if (!Rating || !Name || !Review) {
    res.status(400).json("Please fill the data");
  }
  try {
    const adduser = new Review_Details({
      Rating,
      Name,
      Review,
    });
    await adduser.save();
    res.status(201).json(adduser);
    // }
  } catch (error) {
    res.status(400).json(error);
  }
});
router.get("/Reviewdatadetails", async (req, res) => {
  try {
    const getuser = await Review_Details.find();
    res.status(201).json(getuser);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.post("/Orderdetails", async (req, res) => {
  const {
    Name,
    Email,
    Phone,
    Address,
    City,
    PostelCode,
    Country,
    Payment_Type,
  } = req.body;

  if (
    !Name ||
    !Email ||
    !Phone ||
    !Address ||
    !City ||
    !PostelCode ||
    !Country ||
    !Payment_Type
  ) {
    res.status(400).json("Please fill the data");
  }
  try {
    const adduser = new Order_Details({
      Name,
      Email,
      Phone,
      Address,
      City,
      PostelCode,
      Country,
      Payment_Type,
    });
    await adduser.save();
    res.status(201).json(adduser);
    // }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.patch("/Updateproducts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateduser = await Product_Details.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updateduser);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/individualgetproductdata/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const userindividual = await Product_Details.findById({ _id: id });
    console.log(userindividual);
    res.status(201).json(userindividual);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/individualgetcustomertdata/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const userindividual = await Customer_Details.findById({ _id: id });
    console.log(userindividual);
    res.status(201).json(userindividual);
  } catch (error) {
    res.status(400).json(error);
  }
});
module.exports = router;
