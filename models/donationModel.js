//Donations.js
const mongoose = require("mongoose");

const donationsSchema = new mongoose.Schema({
  amount: {
    type: String,
    required: true,
  },
  client: [{ type: mongoose.Schema.Types.ObjectId, ref: "clients" }],
  location: [{ type: mongoose.Schema.Types.ObjectId, ref: "locations" }],
});

const Donations = mongoose.model("Donations", donationsSchema);

module.exports = Donations;
