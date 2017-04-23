var express = require('express');
var router = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true })

var modelLogin = require('../model/login.js');

router.get('/', modelLogin.renderLogin)
router.post('/', urlencodedParser, modelLogin.checkUser)

module.exports = router;