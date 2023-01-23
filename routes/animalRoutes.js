const express = require("express")
const animalController = require("./../controllers/animalController")

const router = express.Router()

router
    .route("/")
    .get(animalController.getAllAnimals)
    .post(animalController.createAnimal)

 router.route("/:id").get(animalController.findAnimalId)
module.exports = router