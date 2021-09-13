const express = require('express');
const cors = require('cors');
const { resp } = require('./helper/response');

require("./db/mongoose");

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send(resp(true))
})

app.listen(process.env.PORT, () => {
  console.log(`Server is up on port ${process.env.PORT}`)
})