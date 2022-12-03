const jwt = require("jsonwebtoken");
const config = require("../configuration/auth.config.js");

verifyToken = (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    console.log("verify token");
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

verifyAuthor = (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    console.log("verify token");
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;

    if (!req.userId == req.body.author) {
      return res.status(401).send({ message: "Only the author can modify this object"})
    }
    next();
  });
}

const authJwt = {
  verifyToken,
  verifyAuthor
};

module.exports = authJwt;
