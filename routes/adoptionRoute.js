const express = require("express")
const adoptionController = require("./../controllers/AdoptionCatalogue")

const router = express.Router()

router
    .route("/")
    .get(adoptionController.getCatalogue)

module.exports = router