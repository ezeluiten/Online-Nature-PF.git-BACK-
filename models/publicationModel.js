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
    date:Date,
    required:true,
  }
});

const publication = mongoose.model("Publication", publicationSchema);

module.exports = publication;
