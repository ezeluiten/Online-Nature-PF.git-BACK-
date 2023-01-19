const Location = require("../models/locationModel");

exports.createLocation = async (req, res) => {
  try {
    const publication = req.body;
    const { name, address, coordinates } = publication;

    if (!name || !address || !coordinates)
      return res.status(404).send("Faltan datos por completar");

    const newLocation = await Location.create({
      name,
      address,
      coordinates,
    });

    res.status(201).json({
      status: "success",
      requestedAt: req.requestedAt,
      data: {
        publication: newLocation,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error,
    });
  }
};

exports.getLocations = async (req, res) => {
  try {
    const locations = await Location.find({});
    if (!locations.length) return res.status(404).send("No hay Locaciones");

    res.status(201).json({
      status: "success",
      requestedAt: req.requestedAt,
      data: {
        locations: locations,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error,
    });
  }
};
