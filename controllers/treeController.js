const Tree = require("../models/treesModel");

exports.getAllTrees = async (req, res) => {
  try {
    const tree = await Tree.find({});
    if (!tree.length)
      return res.status(404).send("No hay arboles por aqui :C");

    res.status(201).json({
      status: "success",
      requestedAt: req.requestedAt,
      data: {
        tree: tree,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error,
    });
  }
};

exports.createTrees = async (req, res) => {
  try {
    const arboles =req.body
    const { name, species, donations, location} = arboles
    if (!name || !species || !donations || !location) return res.status(404).send("Pon un nombre para el arbol");

    const newTree = await Tree.create({ name, species, donations, location });

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