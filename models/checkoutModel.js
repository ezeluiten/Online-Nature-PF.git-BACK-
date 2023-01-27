const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({

    items: [{
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            require: true
        },
        image_detail: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true
        },
        amount: {
            type: Number,
            require: true
        },
        quantity: {
            type: Number,
            require: true
        },
        location: [{ type: mongoose.Schema.Types.ObjectId, ref: "locations" }],
        species: [{ type: mongoose.Schema.Types.ObjectId, ref: "species" }],
    }],
    totalAmount: {
            type: Number,
            required:true
    },
    payer:{
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
    }
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
