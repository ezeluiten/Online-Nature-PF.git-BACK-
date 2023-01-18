const mongoose = require("mongoose");

const speciesSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
});

const Species = mongoose.model("Species", speciesSchema);

module.exports = Species;
