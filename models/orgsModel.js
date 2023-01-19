const mongoose = require("mongoose");

const orgsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  locations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'locations' }]
});

const Orgs = mongoose.model("Orgs", orgsSchema);

module.exports = Orgs;
