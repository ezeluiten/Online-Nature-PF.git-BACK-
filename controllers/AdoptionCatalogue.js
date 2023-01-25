const Animals = require("../models/animalsModel")
const Tree = require("../models/treesModel");


exports.getCatalogue = async (req, res) => {
    const tree = await Tree.find({})
    const animals = await Animals.find({})
    const allCatalogue = [...animals, ...tree]
    
    try{      
        res.status(201).json({
            status:"success",
            requestedAt:req.requestedAt,
            data:{
                allCatalogue
            }
        })

    }catch (error){
        res.status(400).json({
            status: "failure",
            message: error
        })
    }

}