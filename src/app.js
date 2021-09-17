const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { resp } = require("./helper/response");

require("./db/mongoose.js");

const userRouter = require("./routers/user");
<<<<<<< HEAD
const imgRouter = require("./controllers/image");
=======
const imageRouter = require("./routers/image");
>>>>>>> eff5ab3c8e7e925208637ce572487b8e4fefa3f7

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(userRouter);
<<<<<<< HEAD
app.use(imgRouter);
=======
app.use(imageRouter);
>>>>>>> eff5ab3c8e7e925208637ce572487b8e4fefa3f7

app.get("*", (req, res) => {
  res.status(400).send(resp(false, "The given url does not exist."));
});

module.exports = app;
