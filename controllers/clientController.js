const Client = require("../models/clientModel");

exports.createClient = async (req, res) => {
  try {
    const client = req.body;
    console.log("🚀 ~ file: clientController.js:6 ~ exports.createClient= ~ client", client, req)

    const { name, mail, phone, dni } = client;

    const newClient = await Client.create({
      name,
      mail,
      phone,
      dni,
    });

    res.status(201).json({
      status: "success",
      requestedAt: req.requestedAt,
      data: {
        client: newClient,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error,
    });
  }
};

exports.getAllClients = async (req, res) => {

  try {
    const clients = await Client.find({});

    if (!clients.length)
      return res.status(204).send("No hay cliente por aqui :c");

    res.status(201).json(clients);
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error,
    });
  }
};
exports.getClientByEmail = async (req, res) => {
  const email = req.params
  console.log("🚀 ~ file: clientController.js:50 ~ exports.getClientByEmail= ~ email", email)
  try {
    const client = await Client.findOne({email:email});

    if (!client)
      return res.status(204).send("No hay cliente por aqui :c");

    res.status(201).json(client);
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error,
    });
  }
};

exports.deleteClient = async (req, res) => {
  const idClient = req.params.id;

  try {
    const client = await Client.deleteOne({
      _id: idClient,
    });

    res.status(201).json({
      status: "success",
      client: client,
    });

    console.log(`Ya el Cliente ${idClient} fue eliminado`);
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error,
    });
  }
};

exports.updateClient = async (req, res) => {
  const body = req.body;

  const { name, mail, phone, id, items } = body;

  let client = await Client.findOneAndUpdate(
    id,
    { name, mail, phone, items },
    {
      new: true,
    }
  );

  res.status(201).json({
    status: "success",
    client: client,
  });
};
