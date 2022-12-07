const config = require("../configuration/auth.config");
const User = require("../models/user_model");

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    country: req.body.country,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(201).send({ message: "User was registered successfully" });
  });
};

exports.signin = (req, res) => {
  User.findOne({ username: req.body.username }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400,
    });

    req.session.token = token;

    res.status(200).send({
      id: user._id,
      username: user.username,
    });
  });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out" });
  } catch (err) {
    this.next(err);
  }
};

exports.getOne = async (req, res) => {
  const entity = await User.findById(req.params.id);
  res.status(200).send(entity);
};
