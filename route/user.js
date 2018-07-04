var express = require('express');
var router = express.Router();

var userFunction = require('../function/user');

router.post('/login', function(req, res, next) {
    console.log('/user/login');
    console.log(req.query);

    var msg = userFunction.login(req.query['username'], req.query['password']);
    if (msg['err']) {//错误

    } else {//正确send jwt
        res.send();
    }
});

router.post('/register', function(req, res, next) {
    console.log('/user/register');
    console.log(req.body);

    var msg = userFunction.register(req.body['username'], req.body['password'], res);
    console.log(msg);
    
});

module.exports = router;