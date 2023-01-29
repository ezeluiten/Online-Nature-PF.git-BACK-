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

exports.deleteAnimal = async (req, res) => {
    const {idAnimal} = req.params;
    console.log("id animal",idAnimal);

    try {
      if(idAnimal) {
        const animal = await Animals.deleteOne({
          _id: idAnimal,
        });
        console.log("animal", animal)
        res.status(201).json(animal);
      }
      res.status(201).send("No existe ese id de animal");
  
      console.log(`Ya el Animal ${idAnimal} fue eliminado`);
    } catch (error) {
      res.status(400).json({
        status: "failure",
        message: error,
      });
    }
  };

  exports.deleteTree = async (req, res) => {
    const {idTree} = req.params;
    console.log("id trees",idTree);
    try {
      if(idTree) {
        const tree = await Tree.deleteOne({
          _id: idTree,
        });
        console.log("tree",tree)
        res.status(201).json(tree);
      }
      res.status(201).send("No existe un Tree con ese id");
  
      console.log(`Ya el Tree ${idTree} fue eliminado`);
    } catch (error) {
      res.status(400).json({
        status: "failure",
        message: error,
      });
    }
  };