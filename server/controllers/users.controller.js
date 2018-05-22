const User = require('../models/user'),
      mongoose = require('mongoose'),
      base_URL = "http://localhost:3000/api/users/";

module.exports = {
  read: async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      count: users.length,
      message: "Listado completo de usuarios",
      usersList: users.map(user => {
        return {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          request: {
            type: 'GET',
            url: base_URL + user._id
          }
        };
      })
    });
  },

  create: async (req, res, next) => {    
    const newUser = new User(req.value.body);
    newUser._id = new mongoose.Types.ObjectId();
    const user = await newUser.save();
    res.status(201).json({
      success: true, 
      message: "Usuario creado satisfactoriamente",
      user: user,
      request: {
        type: 'POST',
        url: base_URL + user._id
      }
    });
  }, 

  getUser: async (req, res, next) => {
    const {userId} = req.params;
    const user = await User.findById(userId);
    res.status(200).json({
      success: true,
      message: 'Recuperando información de usuario',
      user: user,
      request: {
        type: 'GET',
        url: base_URL + user._id
      }
    });
  },
  
  edit: async (req, res, next) => {
    const { userId } = req.params;
    const newUser = req.body;

    const result = await User.findByIdAndUpdate(userId, newUser);
    res.status(200).json({
      success: true,
      message: 'El usuario ha sido editado satisfactoriamente.'
    });
  },

  update: async (req, res, next) => {
    const {userId} = req.params;
    const newUser = req.body;

    const result = await User.findByIdAndUpdate(userId, newUser);
    res.status(200).json({
      success: true,
      message: 'El usuario ha sido editado satisfactoriamente.'
    });
  },

  delete: async (req, res, next) => {
    const { userId } = req.params;

    const result = await User.findByIdAndRemove(userId);
    res.status(200).json({
      success: true,
      message: "Usuario borrado satisfactoriamente."
    });
  }
}