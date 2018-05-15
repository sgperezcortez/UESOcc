const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const careerSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  careerName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dischargeProfile: {
    type: String,
    required: true
  },
  admissionProfile: {
    type: String,
    required: true
  },
  workArea: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  cycles: {
    type: String,
    required: true
  },
  years: {
    type: String,
    required: true
  },
  collegeDegree: {
    type: String,
    required: true
  }
});

// Create Model
const Career = mongoose.model('career', careerSchema);
// Export the Model
module.exports = Career;