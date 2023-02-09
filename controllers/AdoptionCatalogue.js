
const Animals = require("../models/animalsModel")
const Tree = require("../models/treesModel");


exports.getCatalogue = async (req, res) => {
	try {
    const tree = await Tree.find({});
    const animals = await Animals.find({});
    const allCatalogue = [...animals, ...tree];
		const { title } = req.query;
		if (title) {
			let itemName = allCatalogue.filter((item) =>
				item.title.toLowerCase().includes(title.toLowerCase())
			);
			itemName.length
				? res.status(201).json(itemName)
				: res.status(404).send("no se encontro el item");
		} else {
			// return res.status(201).json(allCatalogue);
      res.status(201).json({
                    status:"success",
                    requestedAt:req.requestedAt,
                    data:{
                        allCatalogue
        }
      })
		}
    
	} catch (error) {
		res.status(400).json({
			status: "failure",
			message: error,
		});
	}
};


exports.deleteAnimal = async (req, res) => {
    const {id:idAnimal} = req.params;

    try {
      if(idAnimal) {
        const animal = await Animals.deleteOne({
          _id: idAnimal,
        });
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
    try {
      if(idTree) {
        const tree = await Tree.deleteOne({
          _id: idTree,
        });
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
        species,
        item_type 
      } = body;
  
        let animal = await Animals.findByIdAndUpdate(
          _id=id,{ 
            title,
            name,
            image,
            image_detail,
            description,
            description_raw,
            amount,
            location,
            species,
            item_type
          },
          {
            new: true,
            runValidators: true
          }
        );
        res.status(201).json(animal);
  
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
        species,
        item_type
      } = body;
  
      let tree = await Tree.findByIdAndUpdate(
        _id=id,{ 
          title,
          name,
          image,
          image_detail,
          description,
          description_raw,
          amount,
          location,
          species,
          item_type
        },
        {
          new: true,
          runValidators: true
        }
      );
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
        amount,   
      } = req.body;
      if (!title) return res.status(404).send("Pon un nombre");
  
      const newAnimal = await Animals.create({
        title,
        name,
        image,
        image_detail,
        description,
        amount,
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
      if (!title) return res.status(404).send("Pon datos del arbol");
  
      const newTree = await Tree.create({title, image, image_detail, amount, specie, location, description});
  
      res.status(201).json(newTree);
    } catch (error) {
      res.status(400).json({
        status: "failure",
        message: error,
      });
    }
};


exports.getAllAnimals = async (req, res) => {
  try {
    const animals = await Animals.find({});
    if (!animals.length)
      return res.status(404).send("No hay animales por aqui :C");

    const animal = [];
    animals.map((e) => {
      animal.push({
        id:e._id,
        title: e.title,
        image: e.image,
        image_detail: e.image_detail,
        description: e.description,
        description_raw: e.description_raw,
        amount: e.amount,
        location: e.location,
        species: e.species,
        item_type: e.item_type
      });
    });
    res.status(201).json(animal);
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error,
    });
  }
};

exports.getAllTrees = async (req, res) => {
  try {
    const trees = await Tree.find({});
    if (!trees.length)
      return res.status(404).send("No hay arboles por aqui :C");

      const tree = []
      trees.map(e => {
          tree.push({
              id:e._id,
              title:e.title,
              image:e.image,
              image_detail:e.image_detail,
              description:e.description,
              amount:e.amount,
              location:e.location,
              species:e.specie,
              item_type: e.item_type
          })
      })
      
    res.status(201).json(tree);
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error,
    });
  }
};
 exports.deleteOneElement = async (req, res) => {
    const {id:idItem} = req.params;
    const animal= await Animals.find({_id:idItem})

    const tree = await Tree.find({ _id: idItem })
    const specie =animal && animal.length>0?true:false
  
    try {
      if (specie) {
        const animal = await Animals.deleteOne({
          _id: idItem,
        });
        
        res.status(201).json(animal);
      } else{
          const tree = await Tree.deleteOne({
          _id: idItem,
        });
        res.status(201).json(tree);
      }
    }catch(error){
      res.status(400).json({
        status:'failure',
        message:error,
      })
    }
  }

  exports.updateAll = async (req, res) => {
    const body = req.body;

    const {
      title,
      name,
      image,
      image_detail,
      description,
      description_raw,
      amount,
      location,
      species,
      item_type,
    } = body;
    const { id: idItem } = req.params;
        const animal = await Animals.find({ _id: idItem });

        const tree = await Tree.find({ _id: idItem });
        const specie = animal && animal.length > 0 ? true : false;
  try {
  
  if (specie) {
     let animal = await Animals.findByIdAndUpdate(
       (_id = idItem),
       {
         title,
         name,
         image,
         image_detail,
         description,
         description_raw,
         amount,
         location,
         species,
         item_type,
       },
       {
         new: true,
         runValidators: true,
       }
     );
     res.status(201).json(animal);
  } else {
  let tree = await Tree.findByIdAndUpdate(
    (_id = idItem),
    {
      title,
      name,
      image,
      image_detail,
      description,
      description_raw,
      amount,
      location,
      species,
      item_type,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(201).json(tree);
  }
   
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failure",
      message: error,
    });
  }
};