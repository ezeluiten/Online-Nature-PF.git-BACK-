const Publication = require("../models/publicationModel");

exports.createPublication = async (req, res) => {
  try {
    const publication = req.body;
    const { title, content, date, client } = publication;

    if (!title || !content || !client)
      return res.status(404).send("Faltan datos por completar");

    const newPublication = await Publication.create({
      title,
      content,
      date,
      client,
    });

    res.status(201).json({
      status: "success",
      requestedAt: req.requestedAt,
      data: {
        publication: newPublication,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error,
    });
  }
};

exports.getPublications = async (req, res) => {
  try {
    const publications = await Publication.find({});
    if (!publications.length)
      return res.status(404).send("No hay publicaciones :c");

    res.status(201).json({
      status: "success",
      requestedAt: req.requestedAt,
      data: {
        publications: publications,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error,
    });
  }
};

exports.deletePublications = async (req, res) => {
  const idPublications = req.body.id;

  try {
    const publications = await Publication.deleteOne({
      _id: idPublications,
    });

    res.status(201).json({
      status: "success",
      publications: publications,
    });

    console.log(`Ya la publicación ${idPublications} fue eliminado`);
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error,
    });
  }
};

exports.updatePublications = async (req, res) => {
  const body = req.body;

  const { content, title, id } = body;

  let publications = await Publication.findOneAndUpdate(
    id,
    { content, title },
    {
      new: true,
    }
  );

  res.status(201).json({
    status: "success",
    publications: publications,
  });
};
