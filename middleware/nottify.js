let authMiddleware = (req, res, next) => {
  console.log("notify middleware");
  next();
};

module.exports = authMiddleware;
