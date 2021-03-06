var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var userRouter = require('./route/user');
var imageRouter = require('./route/image');

// 设定port变量，意为访问端口
app.set('port', process.env.PORT || 8086);
app.listen(app.get('port'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

app.use('/user', userRouter);
app.use('/image', imageRouter);

app.get('/', function(req, res, next) {
    console.log('root');
    res.send('root');
});
console.log('run8086');