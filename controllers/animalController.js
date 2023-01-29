const Animals = require("../models/animalsModel");

exports.getAllAnimals = async (req, res) => {
  try {
    const animals = await Animals.find({});
    if (!animals.length)
      return res.status(404).send("No hay animales por aqui :C");

    const animal = [];
    animals.map((e) => {
      animal.push({
        title: e.title,
        image: e.image,
        image_detail: e.image_detail,
        description: e.description,
        description_raw: e.description_raw,
        amount: e.amount,
        location: e.location,
        species: e.species,
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

exports.getAnimalById = async (req, res) => {
  try {
    const id = await Animals.findById(req.params.id);
    console.log(id);
    res.status(200).json(id);
  } catch (error) {
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

    res.status(201).json({
      status: "success",
      requestedAt: req.requestedAt,
      data: {
        newAnimal: newAnimal,
      },
    });
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
      species 
    } = body;

    if(id) {
      let animal = await Animals.findOneAndUpdate(
        id,{ 
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