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

module.exports = router;