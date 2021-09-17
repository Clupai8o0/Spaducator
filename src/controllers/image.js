const express = require("express");
const mongoose = require("mongoose");
// require("dotenv").config({ path: "../../env/dev.env" });
const imageRouter = express.Router();
const { resp } = require("../helper/response");

const url = process.env.MONGODB_URL;
const connect = mongoose.createConnection(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;

connect.once("open", () => {
  // initialize stream
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: "photos",
  });
});

imageRouter.route('/image/:filename')
.get((req, res, next) => {
    gfs.find({ filename: req.params.filename }).toArray((err, files) => {
        if (!files[0] || files.length === 0) {
            return res.status(404).send(resp(false,"Not found"));
        }

        if (files[0].contentType === 'image/jpeg' || files[0].contentType === 'image/png' || files[0].contentType === 'image/svg+xml') {
            // render image to browser
            gfs.openDownloadStreamByName(req.params.filename).pipe(res);
        } else {
            res.status(400).send(resp(false , "Not an image"));
        }
    });
});

module.exports = imageRouter;
