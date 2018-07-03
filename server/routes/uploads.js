const router = require('express-promise-router')();
const passport = require('passport');
const passportConfig = require('../config/passport');
const { validateBody, schemas } = require('../helpers/validator');
const authController = require('../controllers/auth.controller');
const uploadImageController = require('../controllers/profile-images.controller');
const passportJwt = passport.authenticate('jwt', {session: false});

// Download a profile image
router.route('/profile-image/:filename')
  .get(passportJwt, uploadImageController.read)
  .delete(passportJwt, uploadImageController.delete);

// Upload a profile image
router.route('/profile-image')
  .post(passportJwt, uploadImageController.create);

  module.exports = router;