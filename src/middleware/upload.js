const util = require("util");
const multer = require("multer");
const {GridFsStorage} = require('multer-gridfs-storage');
require('dotenv').config({ path: '../../env/dev.env' })

var storage = new GridFsStorage({
  url: process.env.MONGODB_URL,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-spaducator-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-spaducator-${file.originalname}`
    };
  }
});

var uploadFile = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFile);
module.exports = uploadFilesMiddleware;
