const upload = require("../middleware/upload");
const { resp } = require("../helper/response");
const colors = require("colors");

const uploadFile = async (req, res) => {
  try {
    await upload(req, res);

    console.log(colors.yellow(req.file));
    if (req.file == undefined) {
      return res.status(400).send(resp(false, "You must select a file"));
    }

    return res.status(201).send(resp(true, 'File has been uploaded'));
  } catch (error) {
    console.log(colors.red(error.message));
    return res.status(500).send(resp(false, error.message));
  }
};

module.exports = {
  uploadFile: uploadFile
};
