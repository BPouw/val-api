const express = require("express");
const router = express.Router();
const crudController = require("../controllers/crud");
const map = require("../models/map_model")();
const {authJwt} = require("../middleware")
const mapCrudController = new crudController(map);

// get all maps
router.get("/maps", mapCrudController.getAll);

// create a map
router.post("/maps",authJwt.verifyToken, mapCrudController.create);

// get a map
router.get("/maps/:id", mapCrudController.getOne);

// update a map
router.put("/maps/:id",authJwt.verifyToken, mapCrudController.update);

// remove a map
router.delete("/maps/:id",authJwt.verifyToken, mapCrudController.delete);

module.exports = router;