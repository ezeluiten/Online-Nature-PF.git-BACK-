const express = require("express");
const passwordChangeController = require("../controllers/changePasswordController");

const router = express.Router();

router
  .route("/")
  .post(passwordChangeController.changePasswordAuth0)
  .patch(passwordChangeController.changePassPatch)
module.exports = router;
