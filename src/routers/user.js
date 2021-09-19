const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { resp } = require("../helper/response");
const colors = require("colors");
const Filter = require("bad-words");
const filter = new Filter();
const auth = require("../middleware/auth");
const validator = require("validator");
const bcrypt = require("bcrypt");

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

router.post("/login", async (req, res) => {
  //* by user id i mean email or username
  const { userId, password } = req.body;
  console.log(colors.blue(userId, password))
  try {
    if (!userId || !password) throw new Error("Missing parameter")

    let user;
    if (validator.isEmail(userId)) {
      user = await User.findOne({ email: userId })
    } else {
      user = await User.findOne({ name: userId })
    }

    if (!user) throw new Error("Could not find user");

    if (!bcrypt.compare(password, user.password)) res.status(400).send(resp(false, "Wrong password"));
    res.status(200).send(resp(true, user))
  } catch (e) {
    res.status(500).send(resp(false, e.message));
  }
})

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
