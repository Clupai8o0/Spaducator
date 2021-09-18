const mongoose = require("mongoose");
const express = require("express");
const course = express.Router();
const Course = require("../models/course");

mongoose.connect(process.env.MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

course.post("/add-course", async (req, res) => {
  try {
    await Course.create(req.body);
    return res.status(200).send("Done!!");
  } catch (error) {
    return res.status(404).send(`Error ${error}`);
  }
});

module.exports = course;
