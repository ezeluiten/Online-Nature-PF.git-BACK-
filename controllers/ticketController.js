const { mercadopago } = require("../utils/mercadoPago")
const Ticket = require("../models/ticketModel")

exports.getMercadopagoNotification = async( req, res ) => {
    const { body , query, params } = req
    console.log("🚀 ~ file: ticketController.js:6 ~ exports.getMercadopagoNotification=async ~ body", body)

    const idPayment = body.data.id
    console.log("🚀 ~ file: ticketController.js:9 ~ exports.getMercadopagoNotification=async ~ idPayment", idPayment)
    const merchantOrder = await mercadopago.payment.findById(body.data.id)
    console.log("🚀 ~ file: ticketController.js:8 ~ exports.getMercadopagoNotification=async ~ merchantOrder", merchantOrder)

    const ticketInformation = {
        payment_id : merchantOrder.body.id,
        items : merchantOrder.body.additional_info.items,
        date_approved: merchantOrder.body.date_approved,
        deductions_frequency : merchantOrder.body.installments,
        operation_type: merchantOrder.body.operation_type,
        payer : merchantOrder.body.payer,
        payment_method : merchantOrder.body.payment_method,
        status : merchantOrder.body.status,
        status_detail: merchantOrder.body.status_detail,
        taxes: merchantOrder.body.taxes_amount,
        transaction_details: {
            net_amount : merchantOrder.body.transaction_details.net_received_amount,
            total_amount : merchantOrder.body.transaction_details.total_paid_amount
        },
        currency_id: merchantOrder.body.currency_id
    }
    console.log("🚀 ~ file: ticketController.js:27 ~ exports.getMercadopagoNotification=async ~ ticketInformation", ticketInformation)
  
    const ticketCreation = await Ticket.create(
        ticketInformation
    )

    try{
        
        res.status(201).send({
            status:"success",
            requestedAt:req.requestedAt,
            data:"success"
        })

    }catch (error){
        res.status(400).json({
            status: "failure",
            message: error
        })
    }
}