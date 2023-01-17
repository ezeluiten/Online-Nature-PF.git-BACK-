const Client = require("../models/clientModel")

exports.createClient = async ( req, res ) => {

    try{
        const client = req.body

        const { name, mail, phone, dni } = client
    
        const newClient = await Client.create({
            name,
            mail,
            phone,
            dni
        })
       
        res.status(201).json({
            status:"success",
            requestedAt:req.requestedAt,
            data:{
                client: newClient
            }
        })

    }catch (error){
        res.status(400).json({
            status: "failure",
            message: error
        })
    }
}

exports.getAllClients = async( req, res ) => {

    try{
        const clients = await Client.find({})
        res.status(201).json({
            status:"success",
            requestedAt:req.requestedAt,
            data:{
                client: clients
            }
        })

    }catch (error){
        res.status(400).json({
            status: "failure",
            message: error
        })
    }
}