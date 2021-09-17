const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
// require('dotenv').config({ path: '../../env/dev.env' })

const storage = new GridFsStorage({
  url: process.env.MONGODB_URL,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      // const filename = `${Date.now()}-spaducator-${file.originalname}`;
      const filename = file.originalname;
      return filename;
    }

    return {
      bucketName: "photos",
      // filename: `${Date.now()}-spaducator-${file.originalname}`
      filename: file.originalname,
    };
  },
});

const uploadFile = multer({
  storage,
  limits: { fileSize: 10000000 },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/))
      return cb(new Error("File must be of the format png or jpg or jpeg"));
    cb(undefined, true)
  },
}).single("file");
const uploadFilesMiddleware = util.promisify(uploadFile);
module.exports = uploadFilesMiddleware;
