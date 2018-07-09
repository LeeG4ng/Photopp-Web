var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
const secret = 'PhotoppWebServer';
var MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
var request = require('request');
const map_key = '2c541c4ac6a4392c10bf0934274f44ff';
// const api_key = 'NER771cf0iCV_Mw_D6whO7BVZWdQe9jR';
// const api_secret = '0PIOsHqmIQpDC6eJhUJXpLMjAfPrA2I1'
// const face_url = 'https://api-cn.faceplusplus.com/facepp/v3/detect';
var needle = require('needle');

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
    // console.log(req.body);
    var token = req.body['jwt'];
    // var username = jwt.decode(token, secret)['iss'];
    var image = req.body['image'];
    // console.log('user ' + username +' upload image.');
    // console.log(image);
    var GPS = req.body['GPS'];

    //获得经纬度参数
    var basecode = image.split('base64,')[1];//删除前缀的base64
    // var buffer = new Buffer(basecode, 'base64');

    var image_type = 'BASE64';
    face_client.detect(basecode, image_type).then(function(result) {
        console.log(JSON.stringify(result));
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

    // var pramas = {api_key:api_key,api_secret:api_secret,'image_base64':basecode,};
    // request.post({url:face_url, form:pramas}, function(face_err, face_res, face_body) {
    //     console.log(face_body);
    // });
    // form.submit(face_url, function(errr, ress) {
    //     console.log(ress.statusMessage);
    // });
    // needle.post(face_url, pramas, function(face_err, face_res) {
    //     if(face_err) throw face_err;
    //     console.log(face_res.body);
    // })
    res.end();
});


module.exports = router;