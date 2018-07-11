var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
const secret = 'PhotoppWebServer';
var MongoClient = require('mongodb').MongoClient;
const db_url = 'mongodb://127.0.0.1:27017';
var request = require('request');
const map_key = '2c541c4ac6a4392c10bf0934274f44ff';
var uuid = require('node-uuid');
//BaiduFace
var AipFaceClient = require("baidu-aip-sdk").face;
var APP_ID = '11501391';
var API_KEY = 'lpQ5gPb6oxEd8170QpTmOE8w';
var SECRET_KEY = '2gzMaFMaCuDuOrlOE6rKoF13jyXK0j04';
var face_client = new AipFaceClient(APP_ID, API_KEY, SECRET_KEY);

router.post('/image', function(req, res, next) {
    // var token = req.body['jwt'];
    // var username = jwt.decode(token, secret)['iss'];
    // console.log(username);
    console.log('get image');
    console.log(req.body);
    var year = Number(req.body['year']);
    var month = Number(req.body['month']);
    var day = Number(req.body['day']);
    console.log(year);
    res.send([{a:1},{a:2},{a:3},{a:4}]);
});

router.post('/upload', function(req, res) {
    
    var token = req.body['jwt'];
    var username = jwt.decode(token, secret)['iss'];
    var image = req.body['image'];
    console.log('user ' + username +' upload image.');
    // console.log(image);

    //生成id
    var id = uuid.v1();

    var GPS = req.body['GPS'];
    var year = Number(req.body['year']);
    var month = Number(req.body['month']);
    var day = Number(req.body['day']);
    console.log(year);

    var image_type = 'BASE64';
    face_client.detect(image, image_type).then(function(result) {
        console.log(result);
        var face = false;
        if (result.result) face = true;

        console.log(GPS);
        if (GPS) {//调用高德接口
            var map_url = 'http://restapi.amap.com/v3/geocode/regeo?key='+map_key+'&location='+GPS;
            request(map_url, function(map_err, map_res, map_body) {
                if (map_err) throw map_err;
                var json = JSON.parse(map_body);
                var location = json['regeocode']['formatted_address'];
                MongoClient.connect(db_url, function(db_err, db) {
                    if (db_err) throw db_err;
                    var dbase = db.db('Photopp');
                    console.log('db connected');
                    var col = dbase.collection('image');
                    col.insertOne({username:username,id:id,image:image,location:location,face:face},function(ins_err, ins_res) {
                        if (ins_err) throw ins_err;
                        console.log(username+'上传照片成功,位置:'+location+',人脸:'+face);
                        res.send({id:id,location:location,face:face});
                        db.close();
                    });
                });
            });
        } else {
            MongoClient.connect(db_url, function(db_err, db) {
                if (db_err) throw db_err;
                var dbase = db.db('Photopp');
                console.log('db connected');
                var col = dbase.collection('image');
                col.insertOne({username:username,id:id,image:image,location:null,face:face},function(ins_err, ins_res) {
                    if (ins_err) throw ins_err;
                    console.log(username+'上传照片成功,无位置,人脸:'+face);
                    res.send({id:id,location:null,face:face});
                    db.close();
                });
            });
        }
    }).catch(function(face_err) {
        if (face_err) throw face_err;
    })
});

router.post('/delete', function(req, res) {
    console.log(req.body);
    res.end();
});

router.post('/download', function(req, res) {
    var token = req.body['jwt'];
    var username = jwt.decode(token, secret)['iss'];
    console.log(username+' post download.');
    var arr = req.body['array'];
    var downloadArr = [];
    MongoClient.connect(db_url, function(db_err, db) {
        if (db_err) throw db_err;
        var dbase = db.db('Photopp');
        console.log('db connected');
        var col = dbase.collection('image');
        col.find({username:username}).toArray(function(find_err, result) {
            if (find_err) throw find_err;
            for (index = 0, len = result.length; index < len; index++) {
                if (arr.indexOf(result[index].id) === -1) {
                    downloadArr.push({image:result[index].image, id:result[index].id});
                    console.log('download id:'+result[index].id);
                }
            }
            res.json(downloadArr);
            console.log('download num:'+downloadArr.length);
            db.close();
        });
    });
});

router.post('/classify', function(req, res) {
    var token = req.body['jwt'];
    var username = jwt.decode(token, secret)['iss'];
    console.log(username+' post classify.');
    var arr = [];
    MongoClient.connect(db_url, function(db_err, db) {
        if (db_err) throw db_err;
        var dbase = db.db('Photopp');
        console.log('db connected');
        var col = dbase.collection('image');
        col.find({username:username}).toArray(function(find_err, result) {
            if (find_err) throw find_err;
            for (index = 0, len = result.length; index < len; index++) {
                arr.push({id:result[index].id, location:result[index].location, face:result[index].face});
            }
            res.send(arr);
            db.close();
        });
    });
});

module.exports = router;