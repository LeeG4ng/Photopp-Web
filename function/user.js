var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017';



var login = function(username, password) {
    MongoClient.connect(url, function(err, db) {
        if(err) throw err;
        var dbase = db.db('Photopp');
        console.log('db connected');
        var col = dbase.collection('user');
        col.find({'username':username}).toArray(function(err, results) {
            if (err) throw err;
            if(results.length) {//用户名已存在
                return({'err':'用户名已存在！', 'jwt':null});
            } else {
                col.insertOne({'username':username, 'password':password}, function(inserterr, res) {
                    if(inserterr) throw inserterr;
                    console.log(`注册成功：%,%`, username, password);
                })
            }
            db.close();
        })
    });
};
exports.login = login;

var register = function(username, password) {
    MongoClient.connect(url, function(err, db) {
        if(err) throw err;
    });
};
exports.register = register;