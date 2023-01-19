const express = require("express");
const donationController = require("../controllers/donationController");

const router = express.Router();

router
  .route("/")
  .get(donationController.getDonations)
  .post(donationController.createDonations);
module.exports = router;
