const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");

const authMiddleware = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/numbers", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "numbers.html"));
  // if (req.cookies.ok && req.cookies.ok == "ok")
  //   res.sendFile(path.join(__dirname, "public", "numbers.html"));
  // else res.sendFile(path.join(__dirname, "public", "index.html"));
});
let arrnum = [];
app.post("/", (req, res) => {
  let num = parseFloat(req.body.data);
  if (isNaN(num)) {
    res.json({ err: "this is not" });
  } else {
    num *= 2;
    arrnum = [...arrnum, num];
    arrnum.sort((a, b) => a > b);
    res.json({ num: num, arr: arrnum });
  }
});
let dbobj = {
  james: "1",
  sten: "2",
};
app.post("/auth/login", (req, res) => {
  let { us, ps } = req.body;
  let sent = false;
  if (us && ps) {
    if (dbobj[us]) {
      if (dbobj[us] == ps) {
        sent = true;
        res.cookie("ok", "ok", { maxAge: 500000 }).json({ msg: "connected" });
      }
    }
  }
  if (!sent) res.json({ err: "us or ps incorrect" });
});

app.listen(PORT, () => {
  console.log("wer life on " + PORT);
});
