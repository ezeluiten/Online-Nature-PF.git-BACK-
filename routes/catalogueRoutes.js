const express = require("express")
const catalogueController = require("../controllers/catalogueController")

const router = express.Router()

router
    .route("/")
    .get(catalogueController.getCatalogue)
module.exports = router