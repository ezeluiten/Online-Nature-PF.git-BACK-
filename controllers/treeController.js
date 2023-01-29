const Tree = require("../models/treesModel");

exports.getAllTrees = async (req, res) => {
  try {
    const trees = await Tree.find({});
    if (!trees.length)
      return res.status(404).send("No hay arboles por aqui :C");

      const tree = []
      trees.map(e => {
          tree.push({
              title:e.title,
              image:e.image,
              image_detail:e.image_detail,
              description:e.description,
              description_raw: e.description_raw,
              amount:e.amount,
              location:e.location,
              species:e.specie
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

exports.getTreeById = async (req, res) => {
  try {
    const id = await Tree.findById(req.params.id);
    res.status(200).json(id);
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

    res.status(201).json({
      status: "success",
      requestedAt: req.requestedAt,
      data: {
        tree: newTree,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error,
    });
  }
};
