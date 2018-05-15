const router = require('express-promise-router')();
const passport = require('passport');
const passportConfig = require('../config/passport');
const { validateBody, schemas } = require('../helpers/validator');
const authController = require('../controllers/auth.controller');
const uploadImageController = require('../controllers/profile-image.controller');
const passportJwt = passport.authenticate('jwt', {session: false});

// Image upload
router.route('/profile-image/:filename')
  .get(passportJwt, uploadImageController.read);
router.route('/profile-image')
  .post(passportJwt, uploadImageController.create);

  module.exports = router;