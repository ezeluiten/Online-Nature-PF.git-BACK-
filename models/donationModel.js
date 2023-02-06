//Donations.js
const mongoose = require("mongoose");

const donationsSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  client: [{ type: mongoose.Schema.Types.ObjectId, ref: "clients" }],
  location: [{ type: mongoose.Schema.Types.ObjectId, ref: "locations" }],
  animals: [{ type: mongoose.Schema.Types.ObjectId, ref: "animals" }],
  trees: [{ type: mongoose.Schema.Types.ObjectId, ref: "trees" }]
});

const Donations = mongoose.model("Donations", donationsSchema);

module.exports = Donations;
