const Client = require("../models/clientModel");

exports.createClient = async (req, res) => {
  try {
    const client = req.body;

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
  const idClient = req.params.id;
  if (idClient) {
    try {
      const clients = await Client.find({ _id: idClient });
      console.log(clients);
    } catch (error) {
      res.status(400).json({
        status: "failure",
        message: error,
      });
    }
  }

  try {
    const clients = await Client.find({});

    if (!clients.length)
      return res.status(404).send("No hay cliente por aqui :c");

    res.status(201).json(clients);
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

  const { name, mail, phone, id } = body;

  let client = await Client.findOneAndUpdate(
    id,
    { name, mail, phone },
    {
      new: true,
    }
  );

  res.status(201).json({
    status: "success",
    client: client,
  });
};
