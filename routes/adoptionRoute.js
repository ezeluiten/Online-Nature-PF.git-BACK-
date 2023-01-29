const express = require("express")
const adoptionController = require("./../controllers/AdoptionCatalogue")

const router = express.Router()

router
    .route("/")
    .get(adoptionController.getCatalogue)

router.route("/:id").delete(adoptionController.deleteAnimal)
router.route("/:id").delete(adoptionController.deleteTree)
module.exports = router