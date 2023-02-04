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
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true
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
  location: [{ type: mongoose.Schema.Types.ObjectId, ref: "locations" }],
});

const Tree = mongoose.model("Tree", threesSchema);

module.exports = Tree;
