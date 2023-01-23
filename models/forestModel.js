const mongoose = require("mongoose");

const forestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  trees: [{ type: mongoose.Schema.Types.ObjectId, ref: "trees" }]
});

const Forest = mongoose.model("Forest", forestSchema);

module.exports = Forest;