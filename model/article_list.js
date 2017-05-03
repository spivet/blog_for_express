var mongoose = require('mongoose');

var article = mongoose.model('article_list', {
  // _id: String,
  author: String,
  createtime: String,
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
function findArticle(option, callback) {
  article.find(option, function (err, result) {
    if (err) console.log(err);
    // 渲染模板
    var data = {
      articleLists: result
    };

    callback(data)
  })
}

// 渲染文章列表
var renderArticleList = function (articleType, callback) {
  switch (articleType) {
    case 'all': findArticle({}, callback)
      break;
    case 'novel': findArticle({ type: '小说' }, callback)
      break;
    case 'it': findArticle({ type: '编程' }, callback)
      break;
    default: res.send('暂时没有!')
  }
};

// 渲染文章详情
var renderArticle = function (articleId, callback) {
  var articleId = mongoose.mongo.ObjectId(articleId)
  article.find({ _id: articleId }, function (err, result) {
    if (err) console.log(err);

    callback(result[0])
  })
}

// 喜欢数增加
var addLike = function (req, res) {
  
}

// 渲染文章管理列表
var renderManage = function (callback) {
  article.find({}, function (err, result) {
    var data = {
      articleLists: result
    };
    callback(data)
  })
}

var modelHome = {
  renderArticleList: renderArticleList,
  renderArticle: renderArticle,
  renderManage: renderManage
};

module.exports = modelHome;