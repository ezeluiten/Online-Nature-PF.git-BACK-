const express = require("express")
const adoptionController = require("./../controllers/AdoptionCatalogue")

const router = express.Router()

router
    .route("/")
    .get(adoptionController.getCatalogue)
    .put(adoptionController.updateAnimal)
    .put(adoptionController.updateTree)
    .post(adoptionController.createAnimal)
    .post(adoptionController.createTrees);

router.route("/:id").delete(adoptionController.deleteAnimal)
router.route("/:id").delete(adoptionController.deleteTree)

router.route("/:id").put(adoptionController.updateAnimal)
router.route("/:id").put(adoptionController.updateTree)
module.exports = router