const express = require("express");
const multer = require("multer");
const busboy = require("busboy");
const path = require("path");
const fs = require("fs");
const { Readable } = require("stream");
const axios = require("axios").default;

const app = express();
const PORT = 7070;

app.use(express.json());

app.post("/save", (req, res) => {
  console.log(req.headers);

  //   const bb = busboy({ headers: req.headers });
  // const bb = busboy({header: req.headers})

  // name은 form-data의 key값이다.
  //   bb.on("file", (name, file, info) => {
  //     const saveTo = path.join(__dirname, "files", info.filename);
  //     console.log("saveTo", saveTo);
  //     console.log("info", info);

  //     axios
  //       .post(`http://localhost:${PORT}/save2`, file, { headers: req.headers })
  //       .then((response) => {
  //         console.log("response", response);
  //         // file.pipe(fs.createWriteStream(saveTo));
  //       });
  //   });

  //   bb.on("close", () => {
  //     res.json({});
  //   });

  const bb = busboy({ headers: req.headers });
  bb.on("file", (name, file, info) => {
    const saveTo = path.join(__dirname, "files", info.filename);
    console.log("saveTo", saveTo);
    console.log("info", info);
  });

  bb.on('close', () => {
    
  })

  axios
    .post(`http://localhost:${PORT}/save2`, req, { headers: req.headers })
    .then((response) => {
      res.json({ ok: 1 });
    });

    req.pipe(bb).pipe();
});

app.post("/save2", (req, res) => {
  const bb = busboy({ headers: req.headers });

  bb.on("file", (name, file, info) => {
    const saveTo = path.join(__dirname, "files2", info.filename);
    console.log("saveTo", saveTo);
    console.log("info", info);

    file.pipe(fs.createWriteStream(saveTo));
  });

  bb.on("close", () => {
    res.json({});
  });

  req.pipe(bb);
});

app.listen(PORT, () => {
  console.log(`the server is running on port: ${PORT}`);
});
