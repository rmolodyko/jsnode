/**
 * Created by rmolodyko on 14.11.2015.
 */

// Create express app
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

// Connect to db
mongoose.connect('mongodb://localhost/words');

// Allow work with static resources
app.use(express.static(__dirname + '/public'));

// Main endpoint to app
app.get('/', function(req,res) {
    // Get index file with angular
    res.sendfile('public/index.html');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Assign custom router for work over the api
app.use('/api', require('./routes/api'));

// Start server
app.listen(3000);

console.log('API running in 3000 port');
