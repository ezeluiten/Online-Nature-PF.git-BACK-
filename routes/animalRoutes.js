const express = require("express")
const animalController = require("./../controllers/animalController")

const router = express.Router()

router
    .route("/")
    .get(animalController.getAllAnimals)
    .post(animalController.createAnimal)
    // .put(animalController.updateAll)
router.route("/:id").get(animalController.getAnimalById)
// router.route("/:id").put(animalController.updateAll)
// router.route("/:id").delete(animalController.deleteOneElement)
module.exports = router