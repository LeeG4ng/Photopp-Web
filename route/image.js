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
    // console.log(image);

    //获得经纬度参数
    var basecode = image.split('base64,')[1];//删除前缀的base64
    var buffer = new Buffer(basecode, 'base64');
    var parser = exif.create(buffer);
    var result = parser.parse();

    console.log(result.tags);
    var GPS1 = result.tags['GPSLongitude'];
    var GPS2 = result.tags['GPSLatitude'];
    if (GPS1 && GPS2) {//调用高德接口
        var GPS = GPS1.toString().substring(0, 9)+','+GPS2.toString().substring(0, 9);
        var key = '2c541c4ac6a4392c10bf0934274f44ff';
        var url = 'http://restapi.amap.com/v3/geocode/regeo?key='+key+'&location='+GPS;
        request(url, function(amaperr, response, body) {
            console.log(body);
        });
    }
    
    res.send(GPS);
});


module.exports = router;