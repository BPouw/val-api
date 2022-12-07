const User = require("../models/user_model");
const neo = require("../../neo");

exports.getOne = async (req, res) => {
  const entity = await User.findById(req.params.id);
  res.status(200).send(entity);
};

exports.follow = async (req, res) => {
  if (!req.body.followUser) {
    return res.status(404).send({ message: "No user to follow was given!" });
  }

  if (req.body.followUser === req.params.id) {
    return res.status(418).send({ message: "You can not follow yourself" });
  }

  const user = await User.findById(req.params.id);

  const userToFollow = await User.findById(req.body.followUser);

  const session = neo.session();

  await session.run(neo.follow, {
    userToFollowName: userToFollow.username.toString(),
    userToFollowId: userToFollow._id.toString(),
    userName: user.username.toString(),
    userId: user._id.toString(),
  });

  session.close();

  res
    .status(201)
    .send({ message: `Succesfully followed user ${userToFollow.username}` });
};

exports.unfollow = async (req, res) => {
  if (!req.body.unfollowUser) {
    return res.status(404).send({ message: "No user to follow was given!" });
  }

  if (req.body.unfollowUser === req.params.id) {
    return res.status(418).send({ message: "You can not follow yourself" });
  }

  const session = neo.session();

  await session.run(neo.unfollow, {
    userToUnfollowId: req.body.unfollowUser,
    userId: req.params.id,
  });

  session.close();

  res.status(200).send({ message: `Succesfully unfollowed` });
};

exports.following = async (req, res) => {
  const session = neo.session();

  const result = await session.run(neo.following, {
    userId: req.params.id,
  });

  session.close();

  res.status(200).json({ following: result.records.length });
};

exports.followers = async (req, res) => {
  const session = neo.session();

  const result = await session.run(neo.followers, {
    userId: req.params.id,
  });

  session.close();

  res.status(200).json({ followers: result.records.length });
};
