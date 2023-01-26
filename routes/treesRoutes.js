const express = require("express");
const treesController = require("./../controllers/treeController");

const router = express.Router();

router
  .route("/")
  .get(treesController.getAllTrees)
  .post(treesController.createTrees);
router.route("/:id").get(treesController.getTreeById)
module.exports = router;
