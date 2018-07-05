var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var secret = 'PhotoppWebServer';
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017';
var request = require('request');
var exif = require('exif-parser');

router.post('/image', function(req, res, next) {
    var token = req.body['jwt'];
    var username = jwt.decode(token, secret)['iss'];
    console.log(username);
    console.log('get image');
    res.end();
});

router.post('/upload', function(req, res) {
    var token = req.body['jwt'];
    var username = jwt.decode(token, secret)['iss'];
    var image = req.body['image'];
    console.log('user ' + username +' upload image.');
    console.log(image);
    
    var buffer = new Buffer(image, 'base64');
    var parser = exif.create(buffer);
    var result = parser.parser();

    console.log(result.tags);
    res.end();
});


module.exports = router;