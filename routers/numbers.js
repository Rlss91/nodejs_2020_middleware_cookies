const path = require("path");

const express = require("express");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.use(authMiddleware);

router.get("/", (req, res) => {
  console.log("nums");
  res.sendFile(path.join(__dirname, "..", "html", "numbers.html"));
});

let arrnum = [];
router.post("/", (req, res) => {
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
router.get("/calc", (req, res) => {
  res.json({ msg: "calc" });
});

module.exports = router;
