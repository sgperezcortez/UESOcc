const router = require('express-promise-router')();
const passport = require('passport');
const passportConfig = require('../config/passport');
const { validateBody, schemas } = require('../helpers/validator');
const authController = require('../controllers/auth.controller');
const profileImageController = require('../controllers/profile-images.controller');
const documentsController = require('../controllers/documents.controller');
const imagesController = require('../controllers/images.controller');
const passportJwt = passport.authenticate('jwt', {session: false});

// Download a profile image
router.route('/profile-image/:filename')
  .get(passportJwt, profileImageController.read)
  .delete(passportJwt, profileImageController.delete);

// Upload a profile image
router.route('/profile-image')
  .post(passportJwt, profileImageController.create);

// Read an delete a specific document
router.route('/documents/:filename')
  .get( documentsController.read)
  .delete(passportJwt, documentsController.delete);

// Upload a document
router.route('/documents')
  .post(passportJwt, documentsController.create);

// Read and delete a specific document
router.route('/images/:filename')
  .get(passportJwt, imagesController.read)
  .delete(passportJwt, imagesController.delete);

router.route('/images')
  .post(passportJwt, imagesController.create);

  module.exports = router;