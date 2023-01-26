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
      amount,
      location,
      species,
    });

    res.status(201).json({
      status: "success",
      requestedAt: req.requestedAt,
      data: {
        client: newAnimal,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error,
    });
  }
};

exports.getAnimalByName = async(req, res) => {
  const forName = async (name) => {
    try {
      const all = [];
      const dataBase = await Animals.findAll({
        where: {
          name: name,
        }
      });
      if (dataBase.length > 0) {
        dataBase.map(e => {all.push(e)})
      }
      return all
    } catch (error) {
      return console.log(error);
    }
  };


  const {name} = req.query;
  try {
    if(name){
      name = name.toLowerCase()
      let animal = await forName(name)
      if (!animal.length) return res.json({ info: "Animal not found" });
      return res.status(200).send(animal);
    }

  }
  catch(e){
    console.log(e)
      return res.status(500).send('Error, see console for more information')
  }
}
