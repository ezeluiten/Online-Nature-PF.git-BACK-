const mongoose = require("mongoose");

const publicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date:{
    type: Date, default: Date.now
  },
  client: [{ type: mongoose.Schema.Types.ObjectId, ref: 'clients' }]
});

const publication = mongoose.model("Publication", publicationSchema);

module.exports = publication;
