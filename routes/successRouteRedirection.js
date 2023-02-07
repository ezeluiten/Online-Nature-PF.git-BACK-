const express = require("express");
const successController = require("./../controllers/successControllerResponse");

const router = express.Router();

router
  .route("/")
  .get(successController.successView)
  .post(successController.successView);
module.exports = router;
