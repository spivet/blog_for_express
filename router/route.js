var express = require('express');
var app = express();

var db = require('../model/connect.js');
// var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
//这里传入了一个密钥加session id
// app.use(cookieParser());
//使用就靠这个中间件
app.use(session({
  secret: 'blog',
  resave: false,
  // cookie: {maxAge: 30000 },
  store: new MongoStore({   //创建新的mongodb数据库
    url: 'mongodb://192.168.0.74/lhzTest',    //数据库的地址，本机的话就是127.0.0.1，也可以是网络主机
    collection: 'sessions',        //数据库的名称。
    mongooseConnection: db
  })
}));

app.get('/', function (req, res) {
  res.redirect('/article/list/all')
})
var articleList = require('./articleList.js');
app.use('/article', articleList);

var login = require('./login.js');
app.use('/login', login);

var admin = require('./admin.js');
app.use('/admin', admin)

app.use('/logout', function (req, res) {
  req.session.destroy()
  res.redirect('/article/list/all')
})
module.exports = app;