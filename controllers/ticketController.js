const { mercadopago } = require("../utils/mercadoPago")
const Ticket = require("../models/ticketModel")
const Animals = require("../models/animalsModel");
const Tree = require("../models/treesModel");
var _ = require('lodash');
const {ticketsByMonth, calculateItemsTotalByTickets} = require("../helper/functionGetTicketByMonth")

exports.getMercadopagoNotification = async( req, res ) => {
    const { body , query, params } = req
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

exports.getClientPaymentsById = async( req, res ) => {
    
    const {id:idClientToSearch} = req.params

    const tickets = await Ticket.find({payer_client_id:idClientToSearch})

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


exports.getTicketsByMonth = async( req, res ) => {
    
    const { month } = req.params

    const filteredTicketsByMonth = await ticketsByMonth(month)

    try{
        
        res.status(201).send({
            status:"success",
            requestedAt:req.requestedAt,
            data:filteredTicketsByMonth
        })

    }catch (error){
        res.status(400).json({
            status: "failure",
            message: error
        })
    }
}

exports.getLastThreeMonths = async( req, res ) => {
    
    
    const months = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre"
    ]
    
    const priorLastMonth = months[11]
    const lastMonth = months[(new Date().getMonth()-1)]
    const currentMonth = months[(new Date().getMonth())]
    const infoPriorLastMonth =  await ticketsByMonth(months[11]) 
    const infoLastMonth =  await ticketsByMonth(months[(new Date().getMonth()-1)]) 
    const infoCurrentMonth =  await ticketsByMonth(months[(new Date().getMonth())]) 

    
   
    const mappingDonationsDic = calculateItemsTotalByTickets(infoPriorLastMonth)
    const mappingDonationsJan = calculateItemsTotalByTickets(infoLastMonth)
    const mappingDonationsFeb = calculateItemsTotalByTickets(infoCurrentMonth)

    
    
    try{
        
        res.status(201).send({
            status:"success",
            requestedAt:req.requestedAt,
            data:[
                {...mappingDonationsDic, month:"december"},
                {...mappingDonationsJan, month:"january"},
                {...mappingDonationsFeb, month:"february"},
            ]
        })

    }catch (error){
        res.status(400).json({
            status: "failure",
            message: error
        })
    }
}

exports.getTotalDonationByItems = async( req, res ) => {

    const tickets = await Ticket.find({})

    const mappingDonations = [...tickets].reduce((acum,ticket) => {
        const items = _.get(ticket, "items", [])
        items.forEach(item=>{
            if(acum.hasOwnProperty(item.id)){
                acum[item.id] = {
                    id: item.id,
                    name: item.title,
                    quantity: acum[item.id].quantity + Number(item.quantity),
                    amount: acum[item.id].amount + (item.unit_price * item.quantity )
                }
            }else{
                acum[item.id] = {
                    id: item.id,
                    name: item.title,
                    quantity: Number(item.quantity),
                    amount: Number((item.unit_price * item.quantity ))
                }
            }
        })

        return acum
    },{});
    
    try{
        
        res.status(201).send({
            status:"success",
            requestedAt:req.requestedAt,
            data:Object.values(mappingDonations)
        })

    }catch (error){
        res.status(400).json({
            status: "failure",
            message: error
        })
    }
}