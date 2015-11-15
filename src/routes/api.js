var express = require('express');
var router = express.Router();
var Word = require('../models/words');

// Get count of models
router.get('/words', function (req, res, next) {

    // If it was passed count query parameter and it equal true then get count of items
    if (req.query.count != null && req.query.count == 'true') {

        // Get count of item
        Word.count(function(err, c){
            // Send response as json
            res.send({count:c});
        });
    } else {
        // Go to predefined methods post, put, get, etc...
        next();
    }
});

// Define and register methods for work with data
Word.methods(['post', 'put', 'get', 'delete']);
Word.register(router, '/words');

module.exports = router;