var express = require('express');
var router = express.Router();

// 处理POST请求需要安装body-parser中间件
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true })
var modelLogin = require('../model/login.js');

router.get('/', function (req, res) {
  var username = req.query.username;
  var password = req.query.password;
  
  modelLogin.renderLogin(username, password, function (data) {
    res.render('../views/pages/login', data)
  })
})

router.post('/', urlencodedParser, function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  modelLogin.checkUser(username, password, function (data) {
    req.session.username = username
    res.redirect(data)
  })
})

module.exports = router;