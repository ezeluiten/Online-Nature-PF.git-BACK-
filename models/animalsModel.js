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
    require: true,
  },
  image_detail: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  description_raw: {
    type: String,
    // require: true
  },
  amount: {
    type: Number,
    require: true,
  },
  item_type: {
    type: String,
    // require: true
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
  description_raw: {
    type: String,
    // require: true
  },
  amount: {
    type: Number,
    require: true
  },
  item_type: {
    type: String,
    // require: true
  },
  location: [{ type: mongoose.Schema.Types.ObjectId, ref: "locations" }],
  species: [{ type: mongoose.Schema.Types.ObjectId, ref: "species" }],
  type: {
    type: String,
    default: "animal",
  },
});

const Animals = mongoose.model("Animals", animalSchema);

module.exports = Animals;
