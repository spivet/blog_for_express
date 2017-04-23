var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.redirect('/article/list/all')
})
var home = require('./home.js');
app.use('/article', home);

var login = require('./login.js');
app.use('/login', login);

module.exports = app;