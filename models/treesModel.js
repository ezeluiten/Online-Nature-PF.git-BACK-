const mongoose = require("mongoose");

const threesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  image_detail: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  specie: {
    type: String,
    required: true
  },
  location: [{ type: mongoose.Schema.Types.ObjectId, ref: "locations" }],
});

const Tree = mongoose.model("Tree", threesSchema);

module.exports = Tree;
