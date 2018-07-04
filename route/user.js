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
    console.log(req.query);

    var msg = userFunction.register(req.query['username'], req.query['password']);
    if (msg['err']) {//错误
        res.status(403).send(msg['err']);
    } else {//正确send jwt
        res.send();
    }
});

module.exports = router;