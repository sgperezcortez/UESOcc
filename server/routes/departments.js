const router = require('express-promise-router')();
const passport = require('passport');
const passportConfig = require('../config/passport');
const passportJwt = passport.authenticate('jwt', {session: false});
const departmentsController = require('../controllers/departments.cotroller');
const { validateBody, schemas } = require('../helpers/validator');

// Departments CRUD

router.route('/')
    .post(validateBody(schemas.departmentSchema), passportJwt, departmentsController.create)
    .get(passportJwt, departmentsController.read);

router.route('/:departmentId')
  .get(passportJwt, departmentsController.getDepartment)
  .put(passportJwt, departmentsController.edit)
  .patch(passportJwt, departmentsController.update)
  .delete(passportJwt, departmentsController.delete)

module.exports = router;