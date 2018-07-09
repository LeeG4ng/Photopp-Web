var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
const secret = 'PhotoppWebServer';
var MongoClient = require('mongodb').MongoClient;
const dburl = 'mongodb://127.0.0.1:27017';
var request = require('request');
const map_key = '2c541c4ac6a4392c10bf0934274f44ff';
//BaiduFace
var AipFaceClient = require("baidu-aip-sdk").face;
var APP_ID = '11501391';
var API_KEY = 'lpQ5gPb6oxEd8170QpTmOE8w';
var SECRET_KEY = '2gzMaFMaCuDuOrlOE6rKoF13jyXK0j04';
var face_client = new AipFaceClient(APP_ID, API_KEY, SECRET_KEY);

router.post('/image', function(req, res, next) {
    var token = req.body['jwt'];
    var username = jwt.decode(token, secret)['iss'];
    console.log(username);
    console.log('get image');
    res.end();
});

router.post('/upload', function(req, res) {
    
    var token = req.body['jwt'];
    // var username = jwt.decode(token, secret)['iss'];
    var image = req.body['image'];
    // console.log('user ' + username +' upload image.');
    // console.log(image);
    var GPS = req.body['GPS'];


    var image_type = 'BASE64';
    face_client.detect(image, image_type).then(function(result) {
        console.log(result.result.face_num);
    }).catch(function(face_err) {
        if (face_err) throw face_err;
    })
    /*
    if (GPS) {//调用高德接口
        var map_url = 'http://restapi.amap.com/v3/geocode/regeo?key='+map_key+'&location='+GPS;
        request(map_url, function(map_err, map_res, map_body) {
            if (map_err) throw map_err;
            var json = JSON.parse(map_body);
            console.log(json);
            var location = json['regeocode']['formatted_address'];
            console.log(location);
            res.send(location);
            
        });
    }*/
    
    // res.send(GPS);


    res.end();
});


module.exports = router;