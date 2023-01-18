const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Animals = mongoose.model("Animals", animalSchema);

module.exports = Animals;
