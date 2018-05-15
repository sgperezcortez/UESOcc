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
  departmentArea: {
    type: String,
    required: true
  }  
})