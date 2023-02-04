const express = require("express")
const paymentNotificationController = require("./../controllers/paymentNotificationController")

const router = express.Router()

router
    .route("/")
    .post(paymentNotificationController.getMercadopagoNotification)
module.exports = router