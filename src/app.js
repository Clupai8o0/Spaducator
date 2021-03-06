const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const { resp } = require("./helper/response");

require("./db/mongoose.js");

const userRouter = require("./routers/user");
const imgController = require("./controllers/image");
const imgRouter = require("./routers/image");
const courseRouter = require("./routers/course");
const app = express();
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(imgRouter);
app.use(imgController);
app.use(courseRouter);

app.get("*", (req, res) => {
  res.status(400).send(resp(false, "The given url does not exist."));
});

//! ignore me
//* just trying to test some code
app.post("/test", async (req, res) => {
  // console.log(colors.red(req.query.something));
  // res.status(200).send(resp(true, req.query));
  res.send(req.body);
  console.log(req.something)
})

module.exports = app;
