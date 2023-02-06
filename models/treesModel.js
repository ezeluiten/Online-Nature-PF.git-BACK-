const mongoose = require("mongoose");

const threesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image_detail: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  description_raw: {
    type: String,
  },
  specie: {
    type: String,
    // required: true
  },
  item_type: {
    type: String,
    // require: true
  },
  species: [{ type: mongoose.Schema.Types.ObjectId, ref: "species" }],
  donations: [{ type: mongoose.Schema.Types.ObjectId, ref: "donations" }],
  location: [{ type: mongoose.Schema.Types.ObjectId, ref: "locations" }],
  type: {
    type: String,
    default: "tree",
  },
});

const Tree = mongoose.model("Tree", threesSchema);

module.exports = Tree;
