const express = require("express")
const animalController = require("./../controllers/animalController")

const router = express.Router()

router
    .route("/")
    .get(animalController.getAllAnimals)
    .post(animalController.createAnimal)
    .put(animalController.updateAnimal)
router.route("/:id").get(animalController.getAnimalById)
router.route("/:id").put(animalController.updateAnimal)
module.exports = router