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
  .post(passportJwt, validateBody(schemas.userSchema), usersController.create)
  .get(passportJwt, usersController.read);

router.route('/:userId')
  .get(passportJwt, usersController.getUser)
  .put(passportJwt, usersController.edit)
  .patch(passportJwt, usersController.update)
  .delete(passportJwt, usersController.delete);

router.route('/:userId/posts')
  .get(passportJwt, usersController.getPosts)
  .post(passportJwt, usersController.createPost);

router.route('/:userId/events')
  .get(passportJwt, usersController.getEvents)
  .post(passportJwt, usersController.createEvent);

module.exports = router;