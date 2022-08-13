const express = require("express");
const router = express.Router();
const crudController = require("../controllers/crud");
const team = require("../models/team_model")();
const teamCrudController = new crudController(team);

// get all teams
router.get("/teams", teamCrudController.getAll);

// create a team
router.post("/teams", teamCrudController.create);

// get a team
router.get("/teams/:id", teamCrudController.getOne);

// update a team
router.put("/teams/:id", teamCrudController.update);

// remove a team
router.delete("/teams/:id", teamCrudController.delete);

module.exports = router;
