const Department = require('../models/departments'),
      mongoose = require('mongoose'),
      User = require('../models/user'),
      base_URL = "http://localhost:3000/api/departments/";

module.exports = {

  // GET- get all departments in database
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

  // POST - create a new department to the Database
  create: async (req, res, next) => {
    const newDepartment = new Department(req.value.body);
    newDepartment._id = new mongoose.Types.ObjectId();
    const department = await newDepartment.save();
    res.status(201).json({
      success: true,
      message: 'Departamento creado satisfactorialmente',
      department,
      request: {
        type: 'POST',
        url: base_URL + department._id
      }
    });
  },

  // GET - get all the information about a specific department
  getDepartment: async (req, res, next) => {
    const { departmentId } = req.params;
    const department = await Department.findById(departmentId)
    res.status(200).json({
      success: true,
      message: 'Recuperando información del departamento',
      department: department,
      request: {
        type: 'GET',
        url: base_URL + departmentId
      }
    });
  },

  // PUT - Modify the information about a specific department. All the fields are requirded
  edit: async (req, res, next) => {
    const { departmentId } = req.params;
    const newInfoDepartment = req.body;

    const department = await Department.findByIdAndUpdate(departmentId, newInfoDepartment);
    res.status(200).json({
      success: true,
      message: 'Departamento editado satisfactoriamente',
      department: department
    });
  },

  // PATCH - Modify the information about a specific department.
  update: async (req, res, next) => {
    const { departmentId } = req.params;
    const newInfoDepartment = req.body;

    const department = await Department.findByIdAndUpdate(departmentId, newInfoDepartment);
    res.status(200).json({
      success: true,
      message: 'Departamento editado satisfactoriamente',
      department: department
    });
  },

  // DELETE - removes a specific department
  delete: async (req, res, next) => {
    const { departmentId } = req.params;

    const result = await Department.findByIdAndRemove(departmentId);
    res.status(200).json({
      success: true,
      message: 'Departamento borrado satisfactoriamente'
    });
  },

  // GET - get all the users of a specific department
  getUsers: async (req, res, next) => {
    const { userId } = req.parms;
    const user = await User.findById(userId);
  },

  createUser: async (req, res, next) => {
    const { departmentId } = req.params;

    // Get department
    const department = Department.findById(departmentId);

    // Create a new User
    const newUser = new User(req.body);
    newUser.department = department;
    await newUser.save();
    department.users.push(newUser);
    await department.save();
    res.status(201).json(newUser);
    }
}