const express = require("express");
const publicationsController = require("./../controllers/publicationController");

const router = express.Router();

router
  .route("/")
  .get(publicationsController.getPublications)
  .post(publicationsController.createPublication)
  .delete(publicationsController.deletePublications)
  .put(publicationsController.updatePublications);

module.exports = router;
