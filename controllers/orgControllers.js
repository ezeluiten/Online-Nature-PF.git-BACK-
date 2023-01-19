const Orgs = require("../models/orgsModel")
// const Client = require("../models/clientModel")

exports.createOrg = async ( req, res ) => {
    try{
        const { name, locations } = req.body

        if(!name) return res.status(404).send("Faltan datos por completar")

        const newLocation = await Orgs.create({name, locations})

        res.status(201).json({
            status:"success",
            requestedAt:req.requestedAt,
            data:{
                lacation: newLocation
            }
        })

    }catch (error){
        res.status(400).json({
            status: "failure",
            message: error
        })
    }
}

exports.getOrgs = async( req, res ) => {
    try{
        const orgs = await Orgs.find({})
        if(!orgs.length) return res.status(404).send("No hay organizaciones :c")

        res.status(201).json({
            status:"success",
            requestedAt:req.requestedAt,
            data:{
                orgs: orgs
            }
        })

    } catch (error){
        res.status(400).json({
            status: "failure",
            message: error
        })
    }
}