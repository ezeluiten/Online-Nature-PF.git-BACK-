const { application } = require("express")
const { db } = require("../models/animalsModel")
const Animals = require("../models/animalsModel")

exports.getAllAnimals = async( req, res ) => {
    try{
        const animals = await Animals.find({})
        if(!animals.length) return res.status(404).send("No hay animales por aqui :C")
        
        const animal = []
        animals.map(e => {
            animal.push({
                title:e.title,
                image:e.image,
                image_detail:e.image_detail,
                description:e.description,
                amount:e.amount,
                location:e.location,
                species:e.species
            })
        })
        res.status(201).json(animal)

    }catch (error){
        res.status(400).json({
            status: "failure",
            message: error
        })
    }
}

exports.createAnimal = async ( req, res ) => {
    try{
        const {title, name, image, image_detail, description,location, species, amount } = req.body
        if (!title)
          return res.status(404).send("Pon un nombre"); 

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
            status:"success",
            requestedAt:req.requestedAt,
            data:{
                client: newAnimal
            }
        })

    }catch (error){
        res.status(400).json({
            status: "failure",
            message: error
        })
    }
}

exports.findAnimalId = async ( id ) => {
    try{
        if(id) {
            const db = [];
            const info = await Animals.findOne({where: {id:id}})
            db.push(info)
            return db
        } 
    }
    catch (error){
        console.log(error)
    }
}

//  Animals.findById(id, function (err, docs) {
//     if (err){
//         console.log(err);
//     }
//     else{
//         console.log("Result : ", docs);
//     }
// });

application.get('/animals/:id', (req, res) => {

    Animals.findById(req.params.id)
    .then(doc => {
        if(!doc) {return res.status(400).end();}
        return res.status(200).json(doc);
    })
    .catch(err => next(err))

})