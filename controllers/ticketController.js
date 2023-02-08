const { mercadopago } = require("../utils/mercadoPago")
const Ticket = require("../models/ticketModel")

exports.getMercadopagoNotification = async( req, res ) => {
    const { body , query, params } = req
    console.log("🚀 ~ file: ticketController.js:6 ~ exports.getMercadopagoNotification=async ~ body", body)
    const idPayment = await body && body.data && body.data.id
    const merchantOrder = await mercadopago.payment.get(idPayment)

    const ticketInformation = {
        payment_id : merchantOrder.body.id,
        items : merchantOrder.body.additional_info.items,
        payer : merchantOrder.body.additional_info.payer,
        date_approved: merchantOrder.body.date_approved,
        deductions_frequency : merchantOrder.body.installments,
        operation_type: merchantOrder.body.operation_type,
        payer_mp : merchantOrder.body.payer,
        payment_method : merchantOrder.body.payment_method,
        status : merchantOrder.body.status,
        status_detail: merchantOrder.body.status_detail,
        taxes: merchantOrder.body.taxes_amount,
        payer_client_id: merchantOrder.body.metadata.payer_id,
        transaction_details: {
            net_amount : merchantOrder.body.transaction_details.net_received_amount,
            total_amount : merchantOrder.body.transaction_details.total_paid_amount
        },
        currency_id: merchantOrder.body.currency_id
    }
  
    const ticketCreation = await Ticket.create(
        ticketInformation
    )

    try{
        
        res.status(201).send({
            status:"success",
            requestedAt:req.requestedAt,
            data:ticketCreation
        })

    }catch (error){
        res.status(400).json({
            status: "failure",
            message: error
        })
    }
}
exports.getTickets = async( req, res ) => {
    
    const tickets = await Ticket.find({})


    try{
        
        res.status(201).send({
            status:"success",
            requestedAt:req.requestedAt,
            data:tickets
        })

    }catch (error){
        res.status(400).json({
            status: "failure",
            message: error
        })
    }
}