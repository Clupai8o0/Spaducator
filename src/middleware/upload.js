const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const storage = new GridFsStorage({
  url: process.env.MONGODB_URL,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];
    const name = file.originalname;

    //? just trying to get rid of the .jpg stuff
    let concat = 0;
    if (
      name.slice(name.length - 3, name.length) === "jpg" ||
      name.slice(name.length - 3, name.length) === "png"
    )
      concat = 3;
    else if (name.slice(name.length - 4, name.length) === "jpeg") concat = 4;

    if (match.indexOf(file.mimetype) === -1) {
      // const filename = `${Date.now()}-spaducator-${file.originalname}`;
      const filename = name.slice(0, name.length-concat);
      return filename;
    }

    return {
      bucketName: "photos",
      // filename: `${Date.now()}-spaducator-${file.originalname}`
      filename: name.slice(0, name.length-concat),
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
