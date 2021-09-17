const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { resp } = require("../helper/response");
const bcrypt = require("bcrypt");
const colors = require("colors");
const Filter = require("bad-words");
const filter = new Filter();
const auth = require("../middleware/auth");

router.post("/add/user", async (req, res) => {
  const { name, password, description, age, email } = req.body;
  try {
    const user = new User({
      name,
      email,
      password,
      description,
      age,
    });
    await user.save();
    res.status(201).send(resp(true, "Successfully created user"));
  } catch (e) {
    res.status(500).send(resp(false, e.message));
  }
});

router.get("/user/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);

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
    res.status(500).send(resp(false, e.message));
  }
});

router.put("/set/description/:id", auth, async (req, res) => {
  const id = req.params.id;
  const { description } = req.body;
  try {
    if (filter.isProfane())
      throw new Error("Description contains profane language");

    await User.findByIdAndUpdate(id, {
      $set: {
        description,
      },
    });
    res.status(200).send(resp(true, "Successfully edited description"));
  } catch (e) {
    res.status(500).send(resp(false, e.message));
  }
});

router.delete("/delete/user/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).send(resp(true, "Deleted user"));
  } catch (err) {
    res.status(500).send(resp(false, err.message));
  }
});

module.exports = router;
