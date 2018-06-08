const router = require('express-promise-router')();
const passport = require('passport');
const passportConfig = require('../config/passport');
const passportJwt = passport.authenticate('jwt', {session: false});
const eventController = require('../controllers/events.controller');
const { validateBody, schemas } = require('../helpers/validator');

// Event CRUD

router.route('/')
  .post(validateBody(schemas.eventSchema), passportJwt, eventController.create)
  .get(passportJwt, eventController.read);

router.route('/:eventId')
  .get(passportJwt, eventController.getEvent)
  .put(passportJwt, eventController.edit)
  .patch(passportJwt, eventController.update)
  .delete(passportJwt, eventController.delete);

module.exports = router;