const express = require("express");
const locationController = require("./../controllers/locationController");

const router = express.Router();

router
  .route("/")
  .get(locationController.getLocations)
  .post(locationController.createLocation);
module.exports = router;
