const Animals = require("../models/animalsModel")
const Tree = require("../models/treesModel");


exports.sortCatalogue = async (req, res) => {
    
    const tree = await Tree.find({})
    const animals = await Animals.find({})
    const allCatalogue = [...animals, ...tree]

    const {type} = req.query

    const orderedAscendantCatalogue = [...allCatalogue].sort(function (a, b) {
        if (a.title > b.title) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        return 0;
    })

    const orderedDescendantCatalogue = [...allCatalogue].sort(function (a, b) {
        if (a.title < b.title) {
          return 1;
        }
        if (a.title > b.title) {
          return -1;
        }
        return 0;
    })

    const result = []
    if(type=="ascendant"){
        result.push(orderedAscendantCatalogue)
    }
    if(type=="descendant"){
        result.push(orderedDescendantCatalogue)
    }

     
    try{      
        res.status(201).json({
            status:"success",
            requestedAt:req.requestedAt,
            data:{
                result
            }
        })

    }catch (error){
        res.status(400).json({
            status: "failure",
            message: error
        })
    }
}

exports.filterByCategory = async (req, res) => {
    
    const tree = await Tree.find({})
    const animals = await Animals.find({})

    const {type} = req.query

   
    const result = []

    if(type=="animals"){
        result.push(animals)
    }
    if(type=="trees"){
        result.push(tree)
    }

    try{      
        res.status(201).json({
            status:"success",
            requestedAt:req.requestedAt,
            data:{
                data
            }
        })

    }catch (error){
        res.status(400).json({
            status: "failure",
            message: error
        })
    }
}