var express = require('express');
var router = express.Router();
var modelHome = require('../model/home.js');

router.get('/list/:type', modelHome.renderArticleList)

router.get('/content/:id', modelHome.renderArticle)

// search
router.get('/search', function (req, res) {
  res.send('search')
})

module.exports = router;
