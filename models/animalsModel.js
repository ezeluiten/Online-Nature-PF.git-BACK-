const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  image: {
    type: String,
    require: true
  },
  image_detail: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  amount: {
    type: String,
    require: true
  },
  location: [{ type: mongoose.Schema.Types.ObjectId, ref: "locations" }],
  species: [{ type: mongoose.Schema.Types.ObjectId, ref: "species" }],
});

const Animals = mongoose.model("Animals", animalSchema);

module.exports = Animals;
