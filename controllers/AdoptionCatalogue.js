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
    const {id:idAnimal} = req.params;
    console.log("id animal",idAnimal,req);

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
    const {id:idTree} = req.params;
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

  exports.updateAnimal = async (req, res) => {

    try {
      const body = req.body;
        console.log(body, req)
      const {    
        id, 
        title,
        name,
        image,
        image_detail,
        description,
        description_raw,
        amount,
        location,
        species 
      } = body;
  
      if(id) {
        let animal = await Animals.findOneAndUpdate(
          _id=id,{ 
            title,
            name,
            image,
            image_detail,
            description,
            description_raw,
            amount,
            location,
            species 
          },
          {
            new: true,
          }
        );
        console.log(id)
        res.status(201).json(animal);
      }
      res.status(404).send(`No existe el animal con el id ${id}`);
      
    } catch (error) {
      console.log(error)
      res.status(400).json({
        status: "failure",
        message: error,
      });
    }
  };

  exports.updateTree = async (req, res) => {

    try {
      const body = req.body;
        console.log(body, req)
      const { 
        id,      
        title,
        name,
        image,
        image_detail,
        description,
        description_raw,
        amount,
        location,
        species 
      } = body;
  
      let tree = await Tree.findOneAndUpdate(
        _id=id,{ 
          title,
          name,
          image,
          image_detail,
          description,
          description_raw,
          amount,
          location,
          species 
        },
        {
          new: true,
        }
      );
        console.log(id)
      res.status(201).json(tree);
    } catch (error) {
      console.log(error)
      res.status(400).json({
        status: "failure",
        message: error,
      });
    }
  };

  exports.createAnimal = async (req, res) => {
    try {
      const {
        title,
        name,
        image,
        image_detail,
        description,
        description_raw,
        location,
        species,
        amount,
      } = req.body;
      if (!title) return res.status(404).send("Pon un nombre");
  
      const newAnimal = await Animals.create({
        title,
        name,
        image,
        image_detail,
        description,
        description_raw,
        amount,
        location,
        species,
      });
  
      res.status(201).json(newAnimal);
    } catch (error) {
      res.status(400).json({
        status: "failure",
        message: error,
      });
    }
  };

  exports.createTrees = async (req, res) => {
    try {
      const arboles = req.body
      const { title, specie, amount, location, image, image_detail, description} = arboles
      if (!title || !specie || !amount || !location) return res.status(404).send("Pon datos del arbol");
  
      const newTree = await Tree.create({title, image, image_detail, amount, specie, location, description, description_raw });
  
      res.status(201).json(newTree);
    } catch (error) {
      res.status(400).json({
        status: "failure",
        message: error,
      });
    }
};