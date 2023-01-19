const Donations = require("../models/donationModel");

exports.createDonations = async (req, res) => {
  try {
    const donation = req.body;
    const { amount, client, location } = donation;

    if (!amount || !client || !location)
      return res.status(404).send("Faltan datos por completar");

    const newDonation = await Donations.create({
      amount,
      client,
      location,
    });

    res.status(201).json({
      status: "success",
      requestedAt: req.requestedAt,
      data: {
        publication: newDonation,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failure",
      message: error,
    });
  }
};

exports.getDonations = async (req, res) => {
  try {
    const donations = await Donations.find({});
    if (!donations.length)
      return res.status(404).send("No hay donaciones en el sistema");

    res.status(201).json({
      status: "success",
      requestedAt: req.requestedAt,
      data: {
        donations: donations,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error,
    });
  }
};
