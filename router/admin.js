var express = require('express');
var router = express.Router();
var modelArticle = require('../model/article_list.js');

router.get('/manage', function (req, res) {
  modelArticle.renderManage(function (data) {
    if (req.session.username) {
      data.signed = true
      res.render('../views/pages/manage.pug', data)
    } else {
      res.redirect('/login')
    }
  })
})

module.exports = router