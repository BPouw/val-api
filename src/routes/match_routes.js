const express = require("express");
const router = express.Router();
const crudController = require("../controllers/crud");
const match = require("../models/match_model")();
const { authJwt } = require("../middleware");
const matchCrudController = new crudController(match);

// get all matches
router.get("/matches", matchCrudController.getAll);

// create a match
router.post("/matches", authJwt.verifyToken, matchCrudController.create);

// get a match
router.get("/matches/:id", matchCrudController.getOne);

// update a match
router.put(
  "/matches/:id",
  authJwt.verifyToken,
  authJwt.verifyAuthor,
  matchCrudController.update
);

// remove a match
router.delete(
  "/matches/:id",
  authJwt.verifyToken,
  authJwt.verifyAuthor,
  matchCrudController.delete
);

module.exports = router;
