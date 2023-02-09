const express = require("express")
const paymentNotificationController = require("../controllers/ticketController")

const router = express.Router()

router
    .route("/")
    .get(paymentNotificationController.getTickets)
    .post(paymentNotificationController.getMercadopagoNotification)
    
    router
    .route("/lastTransactions")
    .get(paymentNotificationController.getLastDonatorTransactions)
    router
    .route("/lastThreeMonths")
    .get(paymentNotificationController.getLastThreeMonths)
    router
    .route("/donationsByItem")
    .get(paymentNotificationController.getTotalDonationByItems)
    router
    .route("/:id")
    .get(paymentNotificationController.getClientPaymentsById)
    router
    .route("/filterByDate/:month")
    .get(paymentNotificationController.getTicketsByMonth)
module.exports = router