const { mercadopago } = require("../utils/mercadoPago")
const Ticket = require("../models/ticketModel")
const Animals = require("../models/animalsModel");
const Tree = require("../models/treesModel");
var _ = require('lodash');
const {ticketsByMonth} = require("../helper/functionGetTicketByMonth")

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
    
    try{
        
        res.status(201).send({
            status:"success",
            requestedAt:req.requestedAt,
            data:{
                [priorLastMonth]:infoPriorLastMonth,
                [lastMonth]:infoLastMonth,
                [currentMonth]:infoCurrentMonth,
            }
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

    const totalDonationsByItems = {}
    
    // const salesByItem = donationsByItems.forEach(itemDonated=>{
    //     if(!totalDonationsByItems[itemDonated.id]){
    //         totalDonationsByItems[itemDonated.id] = {
    //             ...itemDonated
    //         }
    //     }else{

    //     }
    // })
  
    
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