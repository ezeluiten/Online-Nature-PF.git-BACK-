const Publication = require("../models/publicationModel")
// const Client = require("../models/clientModel")

exports.createPublication = async ( req, res ) => {
    try{
        const publication = req.body
        const { title, content, date, client } = publication

        if(!title || !content || !client) return res.status(404).send("Faltan datos por completar")

        const newPublication = await Publication.create({title, content, date, client})

        res.status(201).json({
            status:"success",
            requestedAt:req.requestedAt,
            data:{
                publication: newPublication
            }
        })

    }catch (error){
        res.status(400).json({
            status: "failure",
            message: error
        })
    }
}

exports.getPublications = async( req, res ) => {
    try{
        const publications = await Publication.find({})
        if(!publications.length) return res.status(404).send("No hay publicaciones :c")

        res.status(201).json({
            status:"success",
            requestedAt:req.requestedAt,
            data:{
                publications: publications
            }
        })

    } catch (error){
        res.status(400).json({
            status: "failure",
            message: error
        })
    }
}