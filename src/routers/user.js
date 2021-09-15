const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { resp } = require("../helper/response");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const colors = require("colors");
const Filter = require("bad-words");
const filter = new Filter();

router.post("/add/user", async (req, res) => {
  const { name, password, description, age, email } = req.body;
  try {
    const user = new User({
      name,
      email,
      password,
      id: uuidv4(),
      description,
      age,
    });
    await user.save();
    res.status(201).send(resp(true, "Successfully created user"));
  } catch (e) {
    res.status(500).send(resp(false, e.message));
  }
});

router.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  const password = req.header("pass");
  try {
    const user = await User.findOne({ id });
    if (!user) throw new Error("User not found");

    if (!password) throw new Error("Missing header password");
    if (!bcrypt.compare(password, user.password))
      throw new Error("Wrong password");

    res.status(200).send(resp(true, user));
  } catch (e) {
    res.status(500).send(resp(false, e.message));
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) throw new Error("No users came from the database");

    res.status(200).send(resp(true, users));
  } catch (e) {
    res.status(500).send(resp(false, e.message))
  }
})

router.put("/set/description/:id", async (req, res) => {
  const id = req.params.id;
  const { description } = req.body;
  const password = req.header("pass");
  try {
    const user = await User.findOne({ id });
    if (!user) throw new Error("User not found");

    if (!password) throw new Error("Missing header password");
    if (!bcrypt.compare(password, user.password))
      throw new Error("Wrong password");
    if (filter.isProfane())
      throw new Error("Description contains profane language");

    await User.updateOne(
      { id },
      {
        $set: {
          description,
        },
      }
    );
    res.status(200).send(resp(true, "Successfully edited description"));
  } catch (e) {
    res.status(500).send(resp(false, e.message));
  }
});

module.exports = router;
