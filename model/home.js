var mongoose = require('mongoose');

var article = mongoose.model('article_list', {
  // _id: String,
  author: String,
  updatetime: String,
  type: String,
  label: String,
  title: String,
  description: String,
  content: String,
  pv: Number,
  likes: Number,
  image: String
});
function findArticle(option, req, res) {
  article.find(option, function (err, result) {
    if (err) console.log('查询出错了！');
    // 渲染模板
    var data = {
      articleLists: result
    };
    res.render('../views/pages/articleList.pug', data)
  })
}
var renderArticleList = function (req, res) {
  var params_type = req.params.type;
  switch (params_type) {
    case 'all': findArticle({}, req, res)
      break;
    case 'novel': findArticle({ type: '小说' }, req, res)
      break;
    case 'it': findArticle({ type: '编程' }, req, res)
      break;
    default: res.send('暂时没有!')
  }
};

var renderArticle = function (req, res) {
  var articleId = mongoose.mongo.ObjectId(req.params.id)
  article.find({ _id: articleId }, function (err, result) {
    if (err) console.log(err);
    res.render('../views/pages/article.pug', result[0])
  })
}

var modelHome = {
  renderArticleList: renderArticleList,
  renderArticle: renderArticle
};

module.exports = modelHome;