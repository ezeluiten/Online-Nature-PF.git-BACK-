const express = require("express");
const filterController = require("../controllers/filtersController");

const router = express.Router();

router
  .route("/sort")
  .get(filterController.sortCatalogue)
router
  .route("/category")
  .get(filterController.filterByCategory)
module.exports = router;
