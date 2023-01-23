const express = require("express");
const forestController = require("../controllers/forestController");

const router = express.Router();

router
  .route("/")
  .get(forestController.getForest)
  .post(forestController.createForest);
module.exports = router;