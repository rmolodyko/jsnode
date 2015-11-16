/**
 * Created by rmolodyko on 15.11.2015.
 */

var User = require('../models/User');
var config = require('config');
var url = require("fast-url-parser");
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);

var auth = {};

auth.checkCredentials = function (req, res, next) {
    var requestedUrl = url.parse(req.url).pathname;
    if  (!config.has('access-urls')) {
        next();
        return;
    }
    var urls = config.get('access-urls');
    for (var ui in urls) {
        var pattern = urls[ui].pattern;
        var restricted = urls[ui].restricted;
        if (requestedUrl.match(pattern)) {
            if (restricted) {
                if (req.session.authorized) {
                    // Go ahead
                    next();
                    return;
                }
                else {
                    // User not registered
                    res.writeHead(303, {'Location': '/login'});
                    res.end();
                    return;
                }
            }
            else {
                next();
                return;
            }
        }
    }
};

auth.regUser = function (req, res, next) {
    console.log(req.body);
    //var login = req;
    //var password = req;
    //var user = new User({login: login, password: password});
};

auth.execute = function (app) {

    //app.use('/', auth.checkCredentials);

    app.use(session({
        secret: config.get('secret-key'),
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    }));

    app.post('/signup', function(req, res, next) {

        // Validate form
        var errors = validateSignUpForm(req);
        // If errors is exists then return them or do signup work
        if (Object.keys(errors).length > 0) {
            res.send(errors);
        } else {
            // Save user
            res.send({'text':'redirect'});
        }
    });
};

module.exports = auth;

function validateSignUpForm(req) {

    var login = req.body.login;
    var password = req.body.password;
    var errors = {};

    if (!checkLength(login)) {
        errors.errLogin = 'Your login is wrong';
    }

    if (!checkLength(password, 6)) {
        errors.errPass = 'Your password is wrong';
    }

    return errors;
}

function checkLength(value, len) {
    var length = len || 0;
    if (value != null && value.length > length) {
        return true;
    } else {
        return false;
    }
}
