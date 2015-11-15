/**
 * Created by rmolodyko on 14.11.2015.
 */

var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema for Word model
var schema = new mongoose.Schema({
    word: String
});

// Get model
var model = restful.model('Words', schema);

module.exports = model;

