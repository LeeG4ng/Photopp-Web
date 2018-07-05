var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var secret = 'PhotoppWebServer';

router.post('/image', function(req, res, next) {
    var token = req.body['jwt'];
    var username = jwt.decode(token, secret)['iss'];
    console.log(username);
    console.log('get image');
});



module.exports = router;