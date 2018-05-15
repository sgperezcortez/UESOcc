const router = require('express-promise-router')();
const passport = require('passport');
const passportConfig = require('../config/passport');
const { validateBody, schemas } = require('../helpers/validator');
const authController = require('../controllers/auth.controller');
const usersController = require('../controllers/users.controller');
const passportLocal = passport.authenticate('local', {session: false});
const passportJwt = passport.authenticate('jwt', {session: false});

// Users Authenticate
router.route('/login')
  .post(validateBody(schemas.userLoginSchema), passportLocal, authController.login);

router.route('/logout')
  .get(authController.logout);

// Users CRUD
router.route('/')
  .post(validateBody(schemas.userSchema), usersController.create)
  .get(passportJwt, usersController.read);

router.route('/:userId')
  .get(passportJwt, usersController.getUser)
  .put(passportJwt, usersController.editUser)
  .patch(passportJwt, usersController.updateUser)
  .delete(passportJwt, usersController.deleteUser);

module.exports = router;