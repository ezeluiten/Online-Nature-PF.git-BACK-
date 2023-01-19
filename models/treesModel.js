const mongoose = require("mongoose");

const threesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  species: [{ type: mongoose.Schema.Types.ObjectId, ref: "species" }],
  donations: [{ type: mongoose.Schema.Types.ObjectId, ref: "donations" }],
  location: [{ type: mongoose.Schema.Types.ObjectId, ref: "locations" }],
});

const Tree = mongoose.model("Tree", threesSchema);

module.exports = Tree;
