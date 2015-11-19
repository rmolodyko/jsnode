/**
 * Created by rmolodyko on 14.11.2015.
 */

// Create express app
var express = require('express');
var app = express();
var route = express.Router();
var route1 = express.Router();

app.set('views', './server/jade');
app.set('view engine', 'jade');

var data = [
    {name: 'Home', url: '/', body: 'Some body', title: 'Home'},
    {name: 'About', url: '/about', body: 'About us', title: 'About'}
];

app.get('/', function(req, res) {
    res.render('index', {'data': data, 'current': data[0]});
});

app.get('/about', function(req, res) {
    res.render('index', {'data': data, 'current': data[1]});
});

//route1.get('/u', function(req, res){
//    res.send('awesome');
//});
//
//route.use(function(req, res, next) {
//    next();
//});
//
//route.use('/g', route1);
//
//route.get(/^\/h.*1$/, function(req, res) {
//    console.log('do some action');
//    res.send('is the end');
//});
//
//// Assign custom router for work over the api
//app.use('/api', route);

// Start server
app.listen(3000);

console.log('API running in 3000 port');
