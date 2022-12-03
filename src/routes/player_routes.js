const express = require("express");
const router = express.Router();
const crudController = require("../controllers/crud");
const player = require("../models/player_model")();
const { authJwt } = require("../middleware");
const playerCrudController = new crudController(player);

// get all players
router.get("/players", playerCrudController.getAll);

// create a player
router.post("/players", authJwt.verifyToken, playerCrudController.create);

// get a player
router.get("/players/:id", playerCrudController.getOne);

// update a player
router.put("/players/:id", authJwt.verifyToken, authJwt.verifyAuthor, playerCrudController.update);

// remove a player
router.delete("/players/:id", authJwt.verifyToken, authJwt.verifyAuthor, playerCrudController.delete);

module.exports = router;
