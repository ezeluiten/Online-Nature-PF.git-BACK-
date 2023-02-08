const { mercadopago } = require("../utils/mercadoPago")
const Ticket = require("../models/ticketModel")
const Animals = require("../models/animalsModel");
const Tree = require("../models/treesModel");
var _ = require('lodash');

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

    const months = {
        0: "enero",
        1: "febrero",
        2: "marzo",
        3: "abril",
        4: "mayo",
        5: "junio",
        6: "julio",
        7: "agosto",
        8: "septiembre",
        9: "octubre",
        10: "noviembre",
        11: "diciembre",
    }

    const tickets = await Ticket.find({})

    const normalizeDate = [...tickets].map(ticket=>{
        const ticketDate = new Date(ticket.date_approved).getMonth()
        return {
            ...ticket,
            month_string:months[ticketDate]
        }
    })

    const filteredTicketsByMonth = normalizeDate.filter(ticket=>{
        return ticket.month_string == month
    })

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

exports.getTotalDonationByItems = async( req, res ) => {

    const tree = await Tree.find({});
    const animals = await Animals.find({});
    const allCatalogue = [...animals, ...tree];
    const idsCatalogue = allCatalogue.map(itemCatalogue =>{
        return(
            itemCatalogue._id.toString()
        )
    })
    const donationsByItems = []

    const tickets = await Ticket.find({})
    
    const mappingDonations = [...tickets].map(ticket => {
        const items = _.get(ticket, "items", [])
        items.forEach(itemInTicket=>{
            donationsByItems.push(itemInTicket)
        })
    });

    const totalDonationsByItems = []
    
    const gettingTotalDonationByItems = idsCatalogue.forEach(idItem=>{
        const salesByItem = donationsByItems.filter(itemDonated=>{
            return  itemDonated.id == idItem
        })
        totalDonationsByItems.push(...salesByItem)
        
    })
    console.log("🚀 ~ file: ticketController.js:175 ~ gettingTotalDonationByItems ~ gettingTotalDonationByItems", gettingTotalDonationByItems)
    
    try{
        
        res.status(201).send({
            status:"success",
            requestedAt:req.requestedAt,
            data:totalDonationsByItems
        })

    }catch (error){
        res.status(400).json({
            status: "failure",
            message: error
        })
    }
}