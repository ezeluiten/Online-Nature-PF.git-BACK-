const express = require("express");
const checkOutItems = require("./../controllers/checkoutController");

const router = express.Router();

router
  .route("/")
  .post(checkOutItems.payItemsCart)


module.exports = router;
