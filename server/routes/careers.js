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
  .put(passportJwt, careersController.editCareer)
  .patch(passportJwt, careersController.updateCareer)
  .delete(passportJwt, careersController.deleteCareer);

module.exports = router;