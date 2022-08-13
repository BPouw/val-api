const express = require("express");
const router = express.Router();
const crudController = require("../controllers/crud");
const tournament = require("../models/tournament_model")();
const tournamentCrudController = new crudController(tournament);

// get all tournaments
router.get("/tournaments", tournamentCrudController.getAll);

// create a tournament
router.post("/tournaments", tournamentCrudController.create);

// get a tournament
router.get("/tournaments/:id", tournamentCrudController.getOne);

// update a tournament
router.put("/tournaments/:id", tournamentCrudController.update);

// remove a tournament
router.delete("/tournaments/:id", tournamentCrudController.delete);

module.exports = router;
