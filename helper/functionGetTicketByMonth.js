const Ticket = require("../models/ticketModel")
const _ = require('lodash');

const ticketsByMonth = async (month)=>{

    const monthRequested = month

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

    const tickets = await Ticket.find({}).lean()

    const normalizeDate = [...tickets].map(ticket=>{
        const ticketDate = new Date(ticket.date_approved).getMonth()
        return {
            ...ticket,
            month_string:months[ticketDate]
        }
    })

    const filteredTicketsByMonth = normalizeDate.filter(ticket=>{
        return ticket.month_string == monthRequested
    })

    return filteredTicketsByMonth
}
const calculateItemsTotalByTickets= (tickets) => {


    const mappingDonations = [...tickets].reduce((acum,ticket) => {
        const items = _.get(ticket, "items", [])
        items.forEach(item=>{
            acum.amount = acum.amount + (item.unit_price * item.quantity )
            acum.quantity = acum.quantity + Number(item.quantity)
        })
        
        return acum
    },{amount:0, quantity:0});

    return mappingDonations
}

module.exports = {
    ticketsByMonth,
    calculateItemsTotalByTickets
}