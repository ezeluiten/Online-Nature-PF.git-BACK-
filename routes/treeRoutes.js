const express = require("express")
const treeController = require("./../controllers/treeController")

const router = express.Router()

router
    .route("/")
    .get(treeController.getAllTrees)
    .post(treeController.createTree)
module.exports = router