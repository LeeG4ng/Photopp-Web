var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017';

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

    MongoClient.connect(url, function(err, db) {
        if(err) throw err;
        var dbase = db.db('Photopp');
        console.log('db connected');
        var col = dbase.collection('user');
        col.find({'username':username}).toArray(function(err, results) {
            if (err) throw err;
            if(results.length > 0) {//用户名已存在
                res.status(403).json({'error':'用户名已存在','jwt':null});
            } else {
                console.log('可注册');
                col.insertOne({'username':username, 'password':password}, function(inserterr, res) {
                    if(inserterr) throw inserterr;
                    console.log('注册成功：'+username+' '+password);
                })
                res.send({'error':null, 'jwt':null});
            }
            db.close();
        })
    });
});

module.exports = router;