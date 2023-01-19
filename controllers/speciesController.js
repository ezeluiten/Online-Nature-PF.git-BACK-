const Species = require("../models/speciesModel");

exports.getAllSpecies = async (req, res) => {
  try {
    const species = await Species.find({});
    if (!species.length)
      return res.status(404).send("No hay especies por aqui :C");

    res.status(201).json({
      status: "success",
      requestedAt: req.requestedAt,
      data: {
        species: species,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error,
    });
  }
};

exports.createSpecies = async (req, res) => {
  try {
    const { type } = req.body;
    if (!type) return res.status(404).send("Pon una especie");

    const newSpecies = await Species.create({ type });

    res.status(201).json({
      status: "success",
      requestedAt: req.requestedAt,
      data: {
        species: newSpecies,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error,
    });
  }
};
