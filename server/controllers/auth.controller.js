const passport = require('passport'),
      User = require('../models/users'),
      JWT = require('jsonwebtoken'),
      config = require('../config/config');

loginToken = user => {
  let payload = {
    exp: Math.floor(Date.now() / 1000) + (60*60),
    iss: 'uesocc',
    sub: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    isAdmin: user.isAdmin,
    email: user.email,
    iat: new Date().getTime(),
  }
  return JWT.sign(payload, config.dev.JWT_SECRET);
}

module.exports = {
  login: async (req, res, next) => {
      const { email, password } = req.value.body;
      const user = await User.findOne({email});
      if (user) {
        // Password compare
        const isMatch = await user.isValidPassword(password);
        if (isMatch) {
          const token = loginToken(user);
          return res.status(200).json({
            success: true,
            token,
            user
          });
        } else {
          return res.status(404).json({
            success: false,
            error: 'Incorrect password'
          });
        }
      } else {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        })
      }  
    },

  logout: async (req, res, next) => {
    res.status(200).json({ 
      success: true, 
      message: 'Succesful Logout'
    })
  }
}