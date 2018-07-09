var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
const secret = 'PhotoppWebServer';
var MongoClient = require('mongodb').MongoClient;
const dburl = 'mongodb://127.0.0.1:27017';
var request = require('request');
const map_key = '2c541c4ac6a4392c10bf0934274f44ff';
// const api_key = 'NER771cf0iCV_Mw_D6whO7BVZWdQe9jR';
// const api_secret = '0PIOsHqmIQpDC6eJhUJXpLMjAfPrA2I1'
// const face_url = 'https://api-cn.faceplusplus.com/facepp/v3/detect';
var url = require('url');
var crypto = require('crypto');

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
    console.log(Object.keys(req.body));
    
    var token = req.body['jwt'];
    // var username = jwt.decode(token, secret)['iss'];
    var image = req.body['image'];
    // console.log('user ' + username +' upload image.');
    // console.log(image);
    var GPS = req.body['GPS'];

    //获得经纬度参数
    // var basecode = image.split('base64,')[1];//删除前缀的base64
    // var buffer = new Buffer(basecode, 'base64');

    var image_type = 'BASE64';
    face_client.detect(image, image_type).then(function(result) {
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

    //ali
    // 这里填写AK和请求
    /*
    var ak_id = 'LTAIsEwzch4Y4XXC';
    var ak_secret = 'IukfU6Spec5ZXBRnIFX1lzULAnxk0O';
    var options = {
        url : 'https://dtplus-cn-shanghai.data.aliyuncs.com/face/detect',
        method: 'POST',
        body: JSON.stringify({type:1,content:image}),
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'date': new Date().toUTCString(),
            'Authorization': ''
        }
    };
    // 这里填写AK和请求
    md5 = function(buffer) {
        var hash;
        hash = crypto.createHash('md5');
        hash.update(buffer);
        return hash.digest('base64');
    };
    sha1 = function(stringToSign, secret) {
        var signature;
        return signature = crypto.createHmac('sha1', secret).update(stringToSign).digest().toString('base64');
    };
    // step1: 组stringToSign [StringToSign = #{method}\\n#{accept}\\n#{data}\\n#{contentType}\\n#{date}\\n#{action}]
    var body = options.body || '';
    var bodymd5;
    if(body === void 0 || body === ''){
        bodymd5 = body;
    } else {
        bodymd5 = md5(new Buffer(body));
    }
    console.log(bodymd5)
    var stringToSign = options.method + "\n" + options.headers.accept + "\n" + bodymd5 + "\n" + options.headers['content-type'] + "\n" + options.headers.date + "\n" + url.parse(options.url).path;
    console.log("step1-Sign string:", stringToSign);
    // step2: 加密 [Signature = Base64( HMAC-SHA1( AccessSecret, UTF-8-Encoding-Of(StringToSign) ) )]
    var signature = sha1(stringToSign, ak_secret);
    // console.log("step2-signature:", signature);
    // step3: 组authorization header [Authorization =  Dataplus AccessKeyId + ":" + Signature]
    var authHeader = "Dataplus " + ak_id + ":" + signature;
    console.log("step3-authorization Header:", authHeader);
    options.headers.Authorization = authHeader;
    console.log('authHeader', authHeader);
    // step4: send request
    function callback(error, response, body) {
        if (error) {
            console.log("error", error)
        }
        console.log("step4-response body:", response.statusCode, body)
    }
    request(options, callback);*/
    res.end();
});


module.exports = router;