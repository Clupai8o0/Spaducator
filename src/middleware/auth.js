const User = require("../models/user");
const { resp } = require("../helper/response");
const bcrypt = require("bcrypt");
const colors = require("colors");

const auth = async (req, res, next) => {
  try {
    const id = req.params.id;
    const password = req.header("password");

    const user = await User.findById(id);
    if (!user) throw new Error("User not found");

    if (!password) throw new Error("Missing header password");

    const truth = await bcrypt.compare(password, user.password);
    if (!truth) throw new Error("Wrong password");

    next();
  } catch (e) {
    res.status(401).send(resp(false, e.message));
  }
};

module.exports = auth;
