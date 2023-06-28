const express = require("express");
const multer = require("multer");
const cors = require("cors");
const system = require("system-commands");
const app = express();
app.use(cors());
const sourceStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "audio/");
  },
  filename: (req, file, cb) => {
    cb(null, "source.mp3");
  },
});
const targetStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "audio/");
  },
  filename: (req, file, cb) => {
    cb(null, "target.mp3");
  },
});

const uploadSourceStorage = multer({ storage: sourceStorage });
const uploadTargetStorage = multer({ storage: targetStorage });
// Single file
app.post(
  "/upload/source",
  uploadSourceStorage.single("audioFile"),
  (req, res) => {
    // res.header("Access-Control-Allow-Origin", "*");
    console.log(req.file);
    return res.send("Single file");
  }
);

app.post("/touch", (req, res) => {
  system("py python.py")
    .then((output) => {
      // Log the output
      console.log(output);
    })
    .catch((error) => {
      // An error occurred! Log the error
      console.error(error);
    });
});
// Single file
app.post(
  "/upload/target",
  uploadTargetStorage.single("audioFile"),
  (req, res) => {
    //  res.header("Access-Control-Allow-Origin", "*");
    console.log(req.file);
    return res.send("Single file");
  }
);

var listener = app.listen(3000 || process.env.PORT, () => {
  console.log("Listening on port " + listener.address().port);
});
