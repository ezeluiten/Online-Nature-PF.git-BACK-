const mongoose = require("mongoose")

const clientSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mail:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    dni:{
        type:String,
        required:true
    }
})

const Client = mongoose.model("Client", clientSchema)

module.exports = Client