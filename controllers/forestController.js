const Forest = require("../models/forestModel")

exports.getForest = async( req, res ) => {
    try{
        const forest = await Forest.find({})
        if(!forest.length) return res.status(404).send("No hay bosques por aqui :C")

        res.status(201).json({
            status:"success",
            requestedAt:req.requestedAt,
            data:{
                animals: forest
            }
        })

    }catch (error){
        res.status(400).json({
            status: "failure",
            message: error
        })
    }
}

exports.createForest = async ( req, res ) => {
    try{
        const {name, trees} = req.body
        if (!name)
          return res.status(404).send("Pon un nombre"); 

        const newForest = await Forest.create({name, trees});
       
        res.status(201).json({
            status:"success",
            requestedAt:req.requestedAt,
            data:{
                client: newForest
            }
        })

    }catch (error){
        res.status(400).json({
            status: "failure",
            message: error
        })
    }
}