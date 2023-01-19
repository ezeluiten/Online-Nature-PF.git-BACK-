const express = require("express");
const speciesController = require("./../controllers/speciesController");

const router = express.Router();

router
  .route("/")
  .get(speciesController.getAllSpecies)
  .post(speciesController.createSpecies);
module.exports = router;
