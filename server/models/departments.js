const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  workArea: {
    type: String,
    required: true
  },
  users: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  careers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'career'
  }],
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post'
  }],
  events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'event'
  }]
});

const Department = mongoose.model('department', departmentSchema);
module.exports = Department;
