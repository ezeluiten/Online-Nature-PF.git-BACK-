const Ticket = require("../models/ticketModel")

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

    const tickets = await Ticket.find({})

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

module.exports = {
    ticketsByMonth
}