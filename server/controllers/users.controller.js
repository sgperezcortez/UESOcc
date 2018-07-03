const User = require('../models/users');
const Department = require('../models/departments');
const mongoose = require('mongoose');
const base_URL = "http://localhost:3000/api/users/";

removeFromDepartment = async (oldDepartment, user) => {
  const department = await Department.findByIdAndUpdate(oldDepartment, 
    { $pull: { users: user }},
    { safe: true, upsert: true }
  )
}

addToNewDepartment = async (newDepartment, user) => {
  const department = await Department.findByIdAndUpdate(newDepartment,
    { $push: { users: user }},
    { safe: true, upsert: true }
  )
}

compareDepartment = async (oldDepartment, newDepartment) => {
  console.log(oldDepartment.toString(), newDepartment);
  if (oldDepartment.toString() === newDepartment) {
    return false;
  }
  return true;
};

module.exports = {
  read: async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      count: users.length,
      message: "Listado completo de usuarios",
      usersList: users.map(user => {
        return {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          department: user.department,
          request: {
            type: 'GET',
            url: base_URL + user._id
          }
        };
      })
    });
  },
  
  // POST - creates an user in his department
  create: async (req, res, next) => {    
    const newUser = new User(req.value.body);
    newUser._id = new mongoose.Types.ObjectId();
    const user = await newUser.save();
    const department = await Department.findByIdAndUpdate(user.department,
      {$push: {users: user._id}},
      {safe: true, upsert: true}
    );
    res.status(201).json({
      success: true, 
      message: "Usuario creado satisfactoriamente en su departamento respectivo.",
      user: user,
      department: department.name,
      request: {
        type: 'POST',
        url: base_URL + user._id
      }
    });
  }, 
  
  getUser: async (req, res, next) => {
    const {userId} = req.params;
    const user = await User.findById(userId);
    res.status(200).json({
      success: true,
      message: 'Recuperando información de usuario',
      user: user,
      request: {
        type: 'GET',
        url: base_URL + user._id
      }
    });
  },
  
  
  edit: async (req, res, next) => {
    // get user information
    const { userId } = req.params;
    const user = await User.findById(userId);
    const oldDepartment = user.department;
    
    // get user new information
    const newUser = req.body;
    
    // compare if department has change and do something
    const departmentHasChange = await compareDepartment(oldDepartment, newUser.department);
    if (departmentHasChange){
      removeFromDepartment(oldDepartment, user._id);
      addToNewDepartment(newUser.department, user._id);
    }
    
    // update user information
    const result = await User.findByIdAndUpdate(userId, newUser);

    res.status(200).json({
      success: true,
      message: 'El usuario ha sido editado satisfactoriamente.'
    });
  },

  update: async (req, res, next) => {
    // get user information
    const {userId} = req.params;
    const user = await User.findById(userId);
    const oldDepartment = user.department;

    // get user new information
    const newUser = req.body;

    // compare if department has change and do something
    const departmentHasChange = await compareDepartment(oldDepartment, newUser.department);
    if (departmentHasChange){
      removeFromDepartment(oldDepartment, user._id);
      addToNewDepartment(newUser.department, user._id);
    }
    
    // update user information
    const result = await User.findByIdAndUpdate(userId, newUser);
    
    res.status(200).json({
      success: true,
      message: 'El usuario ha sido editado satisfactoriamente.'
    });
  },

  delete: async (req, res, next) => {
    // get user information
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (user.posts.length > 0 || users.events.length > 0) {
      res.status(404).json({
        success: false,
        error: "El usuario no puede borrarse, aún posee eventos y publicaciones."
      })
    } else {
      // remove the user from Department
      removeFromDepartment(user.department, user._id);
  
      const result = await User.findByIdAndRemove(userId);
      res.status(200).json({
        success: true,
        message: "Usuario borrado satisfactoriamente."
      });
    }
  },

  getPosts: async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('posts');
    res.status(200).json({
      success: true,
      message: "Publicaciones del usuario " + user.firstName,
      userPosts: user.posts
    })
  },

  createPost: async (req, res, next) => {
    const { userId } = req.params;
    const userInfo = await User.findById(userId);
    const newPost = new Post(req.body);
    
    // asign user and department id
    newPost._id = new mongoose.Types.ObjectId();
    newPost.author = userInfo._id;
    newPost.department = userInfo.department;
    
    // save the post into database
    await newPost.save();

    // asign the post to users database
    const user = await User.findByIdAndUpdate(newPost.author, 
      {$push: {posts: newPost._id}},
      {safe: true, upsert: true}
    );

    // asign the post to department database
    const department = await Department.findByIdAndUpdate(newPost.department,
      {$push: {posts: newPost._id}},
      {safe: true, upsert: true}
    );

    res.status(201).json({
      success: true,
      message: "La publicación ha sido creada satisfactoriamente.",
      post: newPost,
      user: user.firstName,
      department: department.name
    });
  },

  getEvents: async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('events');
    res.status(200).json({
      success: true,
      message: "Lista completa de eventos del usuario " + user.firstName,
      events: user.events
    });
  },

  createEvent: async (req, res, next) => {
    const { userId } = req.params;
    const userInfo = await User.findById(userId);
    const newEvent = new Event(req.body);

    newEvent._id = new mongoose.Types.ObjectId();
    newEvent.author = userInfo._id;
    newEvent.department = userInfo.department;

    await newEvent.save();

    const user = await User.findByIdAndUpdate(newEvent.author, 
      {$push: { events: newEvent._id }},
      {safe: true, upsert: true}
    );

    const department = await Department.findByIdAndUpdate(newEvent.department, 
      {$pull: {events: newEvent._id}},
      {safe: true, upsert: true}
    );

    res.status(201).json({
      success: true,
      message: "Evento creado satisfactoriamente.",
      newEvent: newEvent,
      user: user.firstName,
      department: department.name
    })
  }
}