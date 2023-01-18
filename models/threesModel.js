const mongoose = require("mongoose");

const threesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Three = mongoose.model("Three", threesSchema);

module.exports = Three;
