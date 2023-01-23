const Animals = require("../models/animalsModel")
const Trees = require("../models/treesModel")
const { getCatalogue } = require("./catalogueController")

const filterByAnimals = async (req, res) => {
    try {
        const animals = await Animals.find({})
        db.collection.find({ "pais": "EE. UU." })

        if (!animals.length) return res.status(404).send("No hay animales por aqui :C")

        res.status(201).json({
            status: "success",
            requestedAt: req.requestedAt,
            data: {
                animals: animals
            }
        })

    } catch (error) {
        res.status(400).json({
            status: "failure",
            message: error
        })
    }
}
