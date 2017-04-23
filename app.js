var express = require('express');
var path = require('path');
var db = require('./model/connect.js');
var app = require('./router/route.js');

// 模板引擎配置设置
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// 在express中提供静态文件
app.use(express.static(path.join(__dirname, 'public')));

app.listen('8081', function () {
  console.log('监听成功！')
})

