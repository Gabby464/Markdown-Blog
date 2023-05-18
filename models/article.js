const mongoose = require("mongoose");
const articleSchema = new mongoose.Schema({
  title: {
    required: true, 
    type: String
  },
  description: {
    required: true, 
    type: String
  },
  markdown: {
    type: String, 
    required: true, 
  },
  createdAt: {
    type: String,
    default: () => new Date().toLocaleDateString(),
  }

});

module.exports = mongoose.model('Article', articleSchema)