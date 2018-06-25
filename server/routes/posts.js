const router = require('express-promise-router')();
const passport = require('passport');
const passportConfig = require('../config/passport');
const passportJwt = passport.authenticate('jwt', {session: false});
const postsController = require('../controllers/posts.controller');
const { validateBody, schemas } = require('../helpers/validator');

// post CRUD

router.route('/')
  .post(validateBody(schemas.postSchema), passportJwt, postsController.create)
  .get(passportJwt, postsController.read);

router.route('/:postId')
  .get(passportJwt, postsController.getpost)
  .put(passportJwt, postsController.edit)
  .patch(passportJwt, postsController.update)
  .delete(passportJwt, postsController.delete);

module.exports = router;