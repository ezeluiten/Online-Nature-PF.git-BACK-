const express = require("express")
const paymentNotificationController = require("../controllers/ticketController")

const router = express.Router()

router
    .route("/")
    .post(paymentNotificationController.getMercadopagoNotification)
module.exports = router