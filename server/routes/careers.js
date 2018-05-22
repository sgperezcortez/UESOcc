const router = require('express-promise-router')();
const passport = require('passport');
const passportConfig = require('../config/passport');
const passportJwt = passport.authenticate('jwt', {session: false});
const careersController = require('../controllers/careers.controller');
const { validateBody, schemas } = require('../helpers/validator');

// Careers CRUD
router.route('/')
  .post(validateBody(schemas.careerSchema), passportJwt, careersController.create)
  .get(passportJwt, careersController.read);

router.route('/:careerId')
  .get(passportJwt, careersController.getCareer)
  .put(passportJwt, careersController.edit)
  .patch(passportJwt, careersController.update)
  .delete(passportJwt, careersController.delete);

module.exports = router;