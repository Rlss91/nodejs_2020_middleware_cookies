let authMiddleware = (req, res, next) => {
  if (req.cookies.ok && req.cookies.ok == "ok") {
    next();
  } else {
    res.redirect("/");
  }
};

module.exports = authMiddleware;
