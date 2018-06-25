const Post = require('../models/posts');
const User = require('../models/users');
const Department = require('../models/departments');
const mongoose = require('mongoose');
const base_URL = "http://localhost:3000/api/posts/";

module.exports = {

  // GET - get all posts in database
  read: async (req, res, next) => {
    const posts = await Post.find({});
    res.status(200).json({
      success: true,
      count: posts.length,
      message: 'Lista completa de publicaciones',
      postsList: posts.map( post => {
        return {
          _id: post._id,
          title: post.title,
          imagePost: post.imagePost,
          lead: post.lead,
          body: post.body,
          author: post.author,
          department: post.department,
          datePublish: post.datePublish,
          tags: post.tags,
          request: {
            type: 'GET',
            url: base_URL + post._id
          }
        }
      })
    })
  },

  // POST - create a new post to the Database
  create: async (req, res, next) => {
    const newPost = new Post(req.value.body);
    newPost._id = new mongoose.Types.ObjectId();
    const post = await newPost.save();
    const department = await Department.findByIdAndUpdate(post.department,
      {$pull: {posts: post._id}},
      {safe: true, upsert: true}
    );
    const user = await Department.findByIdAndUpdate(post.author,
      {$pull: {posts: post._id}},
      {safe: true, upsert: true}
    );
    res.status(201).json({
      success: true,
      message: 'Publicación creada satisfactoriamente',
      post: post,
      user: user.name,
      department: department.name,
      request: {
        type: 'POST',
        url: base_URL + post._id
      }
    })
  },

  // GET - get all the information about a specific post
  getPost: async (req, res, next) => {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    res.status(200).json({
      success: true,
      message: 'Recuperando la información de la publicación',
      post: post
    })
  },

  // PUT - Modify the information about a specific post. All fields all required
  edit: async (req, res, next) => {
    const { postId } = req.params;
    const newInfoPost = req.body;
    const post = await Post.findByIdAndUpdate(postId, newInfoPost);
    res.status(200).json({
      success: true,
      message: 'Publicación editada satisfactoriamente',
      post: post
    })
  },

  // PATCH - Modify the information about a specific post
  update: async (req, res, next) => {
    const {postId} = req.params;
    const newInfoPost = req.body;
    const post = await Post.findByIdAndUpdate(postId, newInfoPost);
    res.status(200).json({
      success: true,
      message: 'Publicación editada satisfactoriamente',
      post: post,
      request: {
        type: 'GET',
        url: base_URL + postId
      }
    })
  },

  // DELETE - removes a specific post
  delete: async (req, res, next) => {
    const {postId} = req.params;
    const post = await Post.findById(postid);
    const user = await User.findByIdAndUpdate(post.author,
      {$pull: {posts: post._id}},
      {safe: true, upsert: true}
    );
    const department = await Department.findByIdAndUpdate(post.department, 
      {$pull: {posts: post._id}},
      {safe: true, upsert: true}
    )
    const result = await Post.findByIdAndRemove(postId);
    res.status(200).json({
      success: true,
      message: 'Publicación borrada satisfactoriamente'
    })
  }
}