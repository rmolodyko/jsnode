mongoose = require 'mongoose'
mongoose.connect 'mongodb://localhost:27017'

PostSchema = new mongoose.Schema
  name:  String,
  content: String,

Post = mongoose.model 'Post', PostSchema

module.exports = Post
