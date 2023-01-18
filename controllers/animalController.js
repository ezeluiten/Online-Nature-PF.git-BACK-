const Animals = require("../models/animalsModel")

exports.getAllAnimals = async( req, res ) => {
    try{
        const animals = await Animals.find({})
        if(!animals.length) return res.status(404).send("No hay animales por aqui :C")

        res.status(201).json({
            status:"success",
            requestedAt:req.requestedAt,
            data:{
                animals: animals
            }
        })

    }catch (error){
        res.status(400).json({
            status: "failure",
            message: error
        })
    }
}

exports.createAnimal = async ( req, res ) => {
    try{
        const { name } = req.body
        if(!name) return res.status(404).send("Pon un nombre"); 

        const newAnimal = await Animals.create({name})
       
        res.status(201).json({
            status:"success",
            requestedAt:req.requestedAt,
            data:{
                client: newAnimal
            }
        })

    }catch (error){
        res.status(400).json({
            status: "failure",
            message: error
        })
    }
}