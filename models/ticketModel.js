const mongoose = require("mongoose");

const ticketModel = new mongoose.Schema({
    payment_id: {
        type: Number,
        required: true,
    },
    items: {
        type: Array,
        required: true,
    },
    date_approved: {
        type: String,
        required: true,
    },
    deductions_frequency: {
        type: Number,
        required: true,
    },
    operation_type: {
        type: String,
        required: true
    },
    payer: {
        email:{type:String},
        entity_type: {type:String},
        first_name: {type:String},
        id: {type:String},
        identification: {
            type:{type:String},
            number: {type:String},
        },
        last_name: {type:String},
        operator_id: {type:String},
        phone: {
            area_code: {type:String},
            extension: {type:String},
            number: {type:Number},
        },
        type:{type:String},
    },
    payment_method: {
        id: {type:String},
        type:{type:String},
    },
    transaction_details: {
      
        net_amount: {
            type: Number,
            required: true,
        },
        total_amount: {
            type: Number,
            required: true
        },   
    },
    status: {
        type: String,
        require: true
    },
    status_detail: {
        type: String,
        require: true
    },
    taxes: {
        type: Number,
        require: true
    },
    currency_id: {
        type: String,
        require: true
    },
});

const Ticket = mongoose.model("Ticket", ticketModel);

module.exports = Ticket;
