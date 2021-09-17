const express = require("express");
const router = express.Router();
const { resp } = require("../helper/response");
const uploadController = require("../controllers/upload");

router.post("/upload/img", uploadController.uploadFile);

// router.get("/img/:id", async (req, res) => {
//   const id = req.params.id;
//   try {

//   } catch (e) {
//     res.status(500).send(resp(false, e.message))
//   }
// })

module.exports = router;