const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { resp } = require("./helper/response");

require("./db/mongoose.js");

const userRouter = require("./routers/user");

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(userRouter);

app.get("/", (req, res) => {
  res.status(200).send(resp(true));
});

module.exports = app;
