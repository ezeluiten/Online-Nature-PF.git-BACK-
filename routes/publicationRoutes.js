const express = require("express")
const publicationsController = require("./../controllers/publicationController")

const router = express.Router()

router
    .route("/")
    .get(publicationsController.getPublications)
    .post(publicationsController.createPublication)
module.exports = router