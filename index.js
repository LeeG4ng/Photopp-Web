var express = require('express');
var app = express();
var user = require('./route/user')

// 设定port变量，意为访问端口
app.set('port', process.env.PORT || 8086);
app.listen(app.get('port'));

app.all('/user', user);
app.get('/', function(req, res, next) {
    console.log('root');
    res.send('root');
});
console.log('run8086');