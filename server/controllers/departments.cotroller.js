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
          name: department.name,
          workArea: department.workArea,
          users: department.users,
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
    const department = await Department.findById(departmentId);
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
    const department = await Department.findById(departmentId);
    if (department.users.length > 0 || department.events.length > 0 || department.careers.length > 0) {
      res.status(404).json({
        success: false,
        error: "El departamento poseen usuarios y eventos asociados"
      })
    } else {
      const result = await Department.findByIdAndRemove(departmentId);
      res.status(200).json({
        success: true,
        message: 'Departamento borrado satisfactoriamente'
      });
    }

  },

  // GET - get all the users of a specific department
  getUsers: async (req, res, next) => {
    const { departmentId } = req.parms;
    const department = await User.findById(departmentId).populate('users');
    res.status(200).json({
      success: true,
      departmentUsers: department.users
    })

  },

  createUser: async (req, res, next) => {
    // Get department
    const { departmentId } = req.params;
    const department = await Department.findById(departmentId);

    // Create a new User
    const newUser = new User(req.body);
    newUser._id = new mongoose.Types.ObjectId();
    newUser.department = department._id;
    await newUser.save();
    const result = await Department.findByIdAndUpdate(department._id,
      { $push: { users: newUser._id}},
      { safe: true, upsert: true }
    )
    res.status(201).json({
        success: true,
        message: 'Usuario agregado al departamento',
        newUser: newUser
      })
    },

  // GET - get all the careers of a specific department
  getCareers: async (req, res, next) => {
    const { departmentId } = req.params;
    const department = await Department.findById(departmentId).populate('careers');
    res.status(200).json({
      succes: true,
      message: "Carreras correspondientes al departamento " + department.name,
      departmentCareers: department.careers
    })    
  },

  // POST - creates a department into a specific department
  createCareer: async (req, res, next) => {
    // Get department
    const { departmentId } = req.params;
    const department = await Department.findById(departmentId);

    // Create a new Career
    const newCareer = new Career(req.body);
    newCareer.department = department;
    await newCareer.save();
    department.careers.push(newCareer);
    await department.save();
    res.status(201).json({
      success: true,
      message: 'Carrera agreada al departamento',
      newCareer: newCareer
    });
  },

  // GET - get all the posts of a specific department
  getPosts: async (req, res, next) => {
    const { departmentId } = req.params;
    const department = await Department.findById(departmentId).populate('posts');
    res.status(200).json({
      success: true,
      message: "Publicaciones correspondientes al departamento " + department.name,
      departmentPosts: department.posts
    });
  }
}