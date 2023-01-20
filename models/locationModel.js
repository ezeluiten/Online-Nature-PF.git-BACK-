//locationModel.js
const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  coordinates: {
    type: String,
    required: true,
  },
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
