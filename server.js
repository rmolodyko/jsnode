/**
 * Created by rmolodyko on 14.11.2015.
 */

// Create express app
var express = require('express');
var app = express();
var route = express.Router();
var route1 = express.Router();

route1.get('/u', function(req, res){
    res.send('awesome');
});

route.use(function(req, res, next) {
    next();
});

route.use('/g', route1);

route.get(/^\/h.*1$/, function(req, res) {
    console.log('do some action');
    res.send('is the end');
});

// Assign custom router for work over the api
app.use('/api', route);

// Start server
app.listen(3000);

console.log('API running in 3000 port');
