const express = require("express")
const orgsController = require("./../controllers/orgControllers")

const router = express.Router()

router
    .route("/")
    .get(orgsController.getOrgs)
    .post(orgsController.createOrg)
module.exports = router