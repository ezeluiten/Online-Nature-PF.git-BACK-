const mongoose = require("mongoose");

const threesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Tree = mongoose.model("Tree", threesSchema);

module.exports = Tree;
