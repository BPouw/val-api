const express = require("express");
const router = express.Router();
const crudController = require("../controllers/crud");

const PlayerController = require("../controllers/player.controller");
const MatchController = require("../controllers/match.controller");

const team = require("../models/team_model")();
const player = require("../models/player_model")();
const match = require("../models/match_model")();

const teamCrudController = new crudController(team);
const playerController = new PlayerController(player);
const matchController = new MatchController(match);

const { authJwt } = require("../middleware");

// get all teams
router.get("/teams", teamCrudController.getAll);

// create a team
router.post("/teams", authJwt.verifyToken, teamCrudController.create);

// get a team
router.get("/teams/:id", teamCrudController.getOne);

// update a team
router.put("/teams/:id", authJwt.verifyToken, authJwt.verifyAuthor, teamCrudController.update);

// remove a team
router.delete("/teams/:id", authJwt.verifyToken, authJwt.verifyAuthor, teamCrudController.delete);

// get players
router.get("/teams/:id/players", playerController.getPlayers);

// get matches
router.get("/teams/:id/matches", matchController.getMatches);

module.exports = router;
