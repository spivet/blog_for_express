var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var fs = require('fs');

var app = express()
var multer  = require('multer');
var upload = multer({ dest: 'upload/' });
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

router.get('/edit', function (req, res) {
  if (req.session.username) {
    res.render('../views/pages/edit.pug')
  } else {
    res.redirect('/login')
  }
})

router.post('/upload', upload.single('articleCover'), function (req, res) {
  // console.log(req.body)
  // console.log(req.file)
  var save_path = 'public/img/' + req.file.originalname;
  fs.readFile(req.file.path, function (err, data) {
      fs.writeFile(save_path, data, function (err) {
        if( err ) console.log( err );
        console.log('存储成功！')
      });
  });
  var date = new Date();
  var updatetime = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
  var article_opt = {
    // _id: String,
    author: '旧铁皮往南开',
    createtime: updatetime,
    updatetime: updatetime,
    type: req.body.type,
    label: req.body.label,
    title: req.body.title,
    description: req.body.content.slice(0,100),
    content: req.body.content,
    pv: 121,
    likes: 520,
    image: '/img/' + req.file.originalname
  }
  modelArticle.saveArticle(article_opt, function (data) {
    res.redirect('/article/content/' + data)
  })
})

module.exports = router