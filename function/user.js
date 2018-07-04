var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017';



var login = function(username, password) {
    
};
exports.login = login;

var register = function(username, password) {
    var res = {};
    MongoClient.connect(url, function(err, db) {
        if(err) throw err;
        var dbase = db.db('Photopp');
        console.log('db connected');
        var col = dbase.collection('user');
        col.find({'username':username}).toArray(function(err, results) {
            if (err) throw err;
            if(results.length > 0) {//用户名已存在
                res = {'err':'用户名已存在！', 'jwt':null};
                console.log('用户名已存在');
            } else {
                console.log('可注册');
                col.insertOne({'username':username, 'password':password}, function(inserterr, res) {
                    if(inserterr) throw inserterr;
                    console.log('注册成功：'+username+' '+password);
                })
                res = {'err':null, 'jwt':null};
            }
            db.close();
        })
    });
    while (res == {}) {}
    return res;
};
exports.register = register;