const Department = require('../models/departments'),
      mongoose = require('mongoose'),
      base_URL = "http://localhost:3000/api/departments/";

module.exports = {
  read: async (req, res, next) => {
    const departments = await Department.find({});
    res.status(200).json({
      success: true,
      count: departments.length,
      message: 'Lista completa de departamentos o unidad administrativas',
      departmentList: departments.map(department => {
        return {
          _id: department._id,
          deparmentName: department.deparmentName,
          departmentWorkArea: department.departmentWorkArea,
          request: {
            type: 'GET',
            url: base_URL + department._id
          }
        };
      })
    });
  },

  create: async (req, res, next) => {
    const newDepartment = new Department(req.value.body);
    newDepartment._id = new mongoose.Types.ObjectId();
    const department = await newDepartment.save();
    res.status(200).json({
      success: true,
      message: 'Departamento creado satisfactorialmente',
      department,
      request: {
        type: 'POST',
        url: base_URL + department._id
      }
    });
  }
}