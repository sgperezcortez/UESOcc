const Joi = require('joi');

module.exports = {

  validateParams: (schema, name) => {
    return (req, res, next) => {
      const result = Joi.validate({param: req['params'][name]}, schema);
      if (result.error){
        return res.status(400).json(result.error);
      } else {
        if (!req.value) {
          req.value = {};
        }
        if (!req.value['params']) {
          req.value['params'] = {}
        }
        
        req.value['params'][name] = result.value.param;
        next();
      }
    }
  },

  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      } else {
        if (!req.value) {
          req.value = {};
        }
        if (!req.value['body']) {
          req.value['body'] = {};
        }

        req.value['body'] = result.value;
        next();
      }
    }
  },

  schemas: {
    idSchema: Joi.object().keys({
      param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),

    userSchema: Joi.object().keys({
      firstName: Joi.string().min(3).max(30).required(),
      lastName: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().lowercase().required(),
      password: Joi.string().min(5),
      // password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[\@\*\$])[a-zA-Z\d\@\*\$]{6,}$/).required(),
      birthDate: Joi.date(),
      isAdmin: Joi.boolean(),
      profileImage: Joi.string(),
      lastLogin: Joi.date()
    }),

    userLoginSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }),

    careerSchema: Joi.object().keys({
      careerName: Joi.string().min(5).required(),
      description: Joi.string().min(5).required(),
      dischargeProfile: Joi.string().min(5).required(),
      admissionProfile: Joi.string().min(5).required(),
      workArea: Joi.string().min(5).required(),
      code: Joi.string().required().min(3),
      cycles: Joi.number().min(2),
      years: Joi.number().min(2),
      collegeDegree: Joi.string().min(5)
    }),

    departmentSchema: Joi.object().keys({
      departmentName: Joi.string().min(5).required(),
      departmentWorkArea: Joi.string().min(5).required()
    }),

    eventSchema: Joi.object().keys({
      name: Joi.string().required(),
      where: Joi.string().required(),
      when: Joi.object().keys({
        start: Joi.date().required(),
        end: Joi.date()
      }),
      description: Joi.string(),
      cost: Joi.number(),
      tags: Joi.array().items(Joi.string()).required()

    })
  }
}