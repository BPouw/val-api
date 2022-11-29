const express = require("express");
const router = express.Router();
const crudController = require("../controllers/crud");
const map = require("../models/map_model")();
const mapCrudController = new crudController(map);

// get all maps
router.get("/maps", mapCrudController.getAll);

// create a map
router.post("/maps", mapCrudController.create);

// get a map
router.get("/maps/:id", mapCrudController.getOne);

// update a map
router.put("/maps/:id", mapCrudController.update);

// remove a map
router.delete("/maps/:id", mapCrudController.delete);

module.exports = router;