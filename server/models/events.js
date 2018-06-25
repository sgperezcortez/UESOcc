const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  when: {
    start: {
      type: Date,
      required: true
    },
    end: {
      type: Date
    }
  },
  where: {
    type: String,
    required: true
  },
  admission: {
    type: String,
    default: 'Free',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  tags: [{
    type: String,
    required: true
  }]
});

// Create Model
const Event = mongoose.model('event', eventSchema);
// Export the Model
module.exports = Event;