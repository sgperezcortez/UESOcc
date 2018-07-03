const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  imagePost: {
    type: String
  },
  lead: {
    type: String
  },
  body: {
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'department',
    required: true
  },
  datePublish: {
    type: Date,
    default: Date.now()
  },
  tags: [{
    type: String,
    required: true
  }]
});

// Create the model
const Post = mongoose.model('post', postSchema);
// Export the model
module.exports = Post;