const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller")

const MatchController = require("../controllers/match.controller")
const match = require("../models/match_model")();
const matchController = new MatchController(match);

const TeamController = require("../controllers/team.controller")
const team = require("../models/team_model")();
const teamController = new TeamController(team);

const PlayerController = require("../controllers/player.controller")
const player = require("../models/player_model")();
const playerController = new PlayerController(player);

const MapController = require("../controllers/map.controller.js")
const map = require("../models/map_model")();
const mapController = new MapController(map);

// get a user
router.get("/users/:id", userController.getOne);

router.get("/users/:id/matches", matchController.getUserMatches)

router.get("/users/:id/teams", teamController.getUserTeams)

router.get("/users/:id/players", playerController.getUserPlayers)

router.get("/users/:id/maps", mapController.getUserMaps)

module.exports = router;
