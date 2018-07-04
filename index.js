var express = require('express');
var app = express();
var userRouter = require('./route/user');
var imageRouter = require('./route/image');

// 设定port变量，意为访问端口
app.set('port', process.env.PORT || 8086);
app.listen(app.get('port'));

app.use('/user', userRouter);
app.use('/image', imageRouter);

app.get('/', function(req, res, next) {
    console.log('root');
    res.send('root');
});
console.log('run8086');