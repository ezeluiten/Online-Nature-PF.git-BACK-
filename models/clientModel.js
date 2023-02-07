const mongoose = require("mongoose")

const clientSchema = new mongoose.Schema({
    name:{
        type:String,
        required:false
    },
    mail:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:false
    },
    dni:{
        type:String,
        required:false
    }
})

const Client = mongoose.model("Client", clientSchema)

module.exports = Client


