const mongoose = require("mongoose");

const orgsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Orgs = mongoose.model("Orgs", orgsSchema);

module.exports = Orgs;
