const Tree = require("../models/threesModel")

exports.createTree = async ( req, res ) => {
try{
    const tree = req.body

    const { name } = tree
    
    const newTree =  await Tree.create({
        name,
    })

    res.status(201).json({
        status:"Success",
        requestedAt:req.requestedAt,
        data:{
            tree: newTree
        }
    })
}

catch (error){
    res.status(400).json({
        status: "failure",
        message: error
    })
}
}

exports.getAllTrees = async( req, res ) => {

    try{
        const trees = await Tree.find({})
        res.status(201).json({
            status:"success",
            requestedAt:req.requestedAt,
            data:{
                tree: trees
            }
        })

    }catch (error){
        res.status(400).json({
            status: "failure",
            message: error
        })
    }
}