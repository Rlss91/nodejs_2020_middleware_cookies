const express = require("express");
const router = express.Router();

let dbobj = {
  james: "1",
  sten: "2",
};

router.post("/login", (req, res) => {
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

router.get("/calc", (req, res) => {
  res.json({ msg: "calc from auth" });
});

module.exports = router;
