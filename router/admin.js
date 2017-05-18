var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var fs = require('fs');

var app = express()
var multer  = require('multer');
var upload = multer({ dest: 'upload/' });
var modelArticle = require('../model/article_list.js');

router.get('/manage', function (req, res) {
  var data = {};
    if (req.session.username) {
      data.signed = true
      res.render('../views/pages/manage.pug',data)
    } else {
      res.redirect('/login')
    }
})

router.post('/manage/paging', urlencodedParser, function (req, res) {
  var opt = req.body;
  modelArticle.renderManage(opt ,function (data) {
    res.send(data)
  })
})
router.get('/manage/length', urlencodedParser, function (req, res) {
  modelArticle.getLength(function (data) {
    res.send(JSON.stringify(data))
  })
})

router.get('/delete/:id', function (req, res) {
  var articleId = req.params.id;
  modelArticle.deleteArticle(articleId, function () {
    res.redirect('/admin/manage')
  })
})

router.get('/edit+(/:id)?', function (req, res) {
  if (req.session.username) {
    if (req.params.id) {
      modelArticle.renderArticle(req.params.id, function (data) {
        res.render('../views/pages/edit.pug', data)
      })
    } else {
      res.render('../views/pages/edit.pug', {
        _id: '',
        type: '',
        label: '',
        title: '',
        content: '',
        delta: '',
        image: ''
      })
    }
  } else {
    res.redirect('/login')
  }
})

router.post('/upload', upload.single('articleCover'), function (req, res) {
  var save_path = 'public/img/' + req.file.originalname;
  fs.readFile(req.file.path, function (err, data) {
      fs.writeFile(save_path, data, function (err) {
        if( err ) console.log( err );
        console.log('图像存储成功！')
      });
  });

  var article_opt = {
    // _id: mongoose.Schema.Types.ObjectId,
    params_id: req.body.params_id,
    author: '旧铁皮往南开',
    type: req.body.type,
    label: req.body.label,
    title: req.body.title,
    description: req.body.text.slice(0,200),
    content: req.body.content,
    delta: req.body.delta,
    pv: 121,
    likes: 520,
    image: '/img/' + req.file.originalname
  }
console.log(article_opt.params_id)
  modelArticle.saveArticle(article_opt, function (data) {
    res.redirect('/article/content/' + data)
  })
})

module.exports = router