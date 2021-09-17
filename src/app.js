const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { resp } = require("./helper/response");

require("./db/mongoose.js");

const userRouter = require("./routers/user");
const imgRouter = require("./controllers/image");
const imgRouter2 = require("./routers/image");

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(userRouter);
app.use(imgRouter);
app.use(imgRouter2);

app.get("*", (req, res) => {
  res.status(400).send(resp(false, "The given url does not exist."));
});

module.exports = app;
