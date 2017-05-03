var express = require('express');
var router = express.Router();
var modelArticle = require('../model/article_list.js');

router.get('/list/:type', function(req, res) {
  var articleType = req.params.type;
  modelArticle.renderArticleList(articleType, function (data) {
    if (req.session.username) {
      data.signed = true
    } else {
      data.signed = false
    }
    res.render('../views/pages/articleList.pug', data)
  });
})

router.get('/content/:id', function(req,res) {
  var articleId = req.params.id
  var data = modelArticle.renderArticle(articleId, function (data) {
    if (req.session.username) {
      data.signed = true
    } else {
      data.signed = false
    }
    res.render('../views/pages/article.pug', data)
  });
})

// router.post('/like', modelArticle.)
// search
router.get('/search', function (req, res) {
  res.send('search')
})

module.exports = router;
