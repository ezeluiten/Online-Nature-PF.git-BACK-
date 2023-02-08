const express = require("express");
const adoptionController = require("./../controllers/AdoptionCatalogue");

const router = express.Router();

router.route("/").get(adoptionController.getCatalogue);

router
	.route("/")
	.get(adoptionController.getCatalogue)
	.put(adoptionController.updateAll);

router.route("/:id").delete(adoptionController.deleteOneElement);
router.route("/:id").put(adoptionController.updateAll);

router
	.route("/animals")
	.get(adoptionController.getAllAnimals)
	.post(adoptionController.createAnimal)
	.put(adoptionController.updateAnimal);
// router.route("/animals/:id").delete(adoptionController.deleteAnimal)

router
	.route("/trees")
	.get(adoptionController.getAllTrees)
	.put(adoptionController.updateTree)
	.post(adoptionController.createTrees);
// router.route("/trees/:id").delete(adoptionController.deleteTree)

router
	.route("/trees")
	.get(adoptionController.getAllTrees)
	.put(adoptionController.updateTree)
	.post(adoptionController.createTrees);
router.route("/trees/:id").delete(adoptionController.deleteTree);

// router.route("/:id").put(adoptionController.updateAnimal)
// router.route("/:id").put(adoptionController.updateTree)
module.exports = router;
