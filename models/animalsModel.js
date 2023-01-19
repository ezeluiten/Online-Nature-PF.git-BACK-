const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: [{ type: mongoose.Schema.Types.ObjectId, ref: "locations" }],
  species: [{ type: mongoose.Schema.Types.ObjectId, ref: "species" }],
  donations: [{ type: mongoose.Schema.Types.ObjectId, ref: "donations" }],
});

const Animals = mongoose.model("Animals", animalSchema);

module.exports = Animals;
