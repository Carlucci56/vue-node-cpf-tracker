const { fileUploader, fileReader } = require("../../application/services/fileHandler");

// Upload PDF file
exports.uploadFile = (req, res) => {
  try {
    const uploadResponse = fileUploader(req.file);
    console.log(uploadResponse);

    const readerResponse = fileReader(uploadResponse.fileName);
    console.log({uploadResponse, readerResponse});

    res.status(200).send({uploadResponse, readerResponse});
  } catch (error) {
    res.status(400).send(error.message);
  }
};
