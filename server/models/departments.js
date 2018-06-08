const mongoose = require('mongoose');
const User = require('../models/user');
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  departmentName: {
    type: String,
    required: true
  },
  departmentWorkArea: {
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
  }]
});

const Department = mongoose.model('department', departmentSchema);
module.exports = Department;
