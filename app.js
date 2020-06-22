const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");

const authMiddleware = require("./middleware/auth");
const authRouter = require("./routers/auth");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.use("/auth", authRouter);

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

app.post("/test", (req, res) => {
  // res.setHeader("my header", "my data");
  console.log(req.headers);
  res.setHeader("asdfsd", "fawegweg");
  // console.log(req.query);
  res.json("ok");
});

app.post("/altlogin", (req, res) => {
  res.setHeader("token", "764654356");
  res.json("ok");
});

app.listen(PORT, () => {
  console.log("wer life on " + PORT);
});
