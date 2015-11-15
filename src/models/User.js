/**
 * Created by rmolodyko on 14.11.2015.
 */

var mongoose = require('mongoose');

// Schema for User model
var Schema = new mongoose.Schema({
    login: String,
    password: String
});

// Get model
var model = mongoose.model('User', Schema, 'user');

module.exports = model;
