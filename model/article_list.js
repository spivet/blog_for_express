var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  author: String,
  createtime: String,
  updatetime: String,
  type: String,
  label: String,
  title: String,
  description: String,
  content: String,
  text: String,
  delta: Object,
  pv: Number,
  likes: Number,
  image: String
})
articleSchema.pre('save', function (next) {
  var date = new Date();
  if (this.isNew) {
    this.updatetime = this.createtime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  } else {
    this.updatetime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }
  next()
});

var articleModel = mongoose.model('article_list', articleSchema);
function findArticle(option, callback) {
  articleModel.find(option, function (err, result) {
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
  articleModel.find({ _id: articleId }, function (err, result) {
    if (err) console.log(err);

    callback(result[0])
  })
}

// 喜欢数增加
var addLike = function (req, res) {

}

// 文章管理列表分页获取数据
var renderManage = function (opt, callback) {
  var currentSize = (opt.currentPage - 1) * opt.pageSize;
  articleModel.find({}, function (err, result) {
    var data = {
      articleLists: result
    };
    callback(result)
  }).skip(currentSize).limit(opt.pageSize)
}
// 文章管理列表获取总数
var getLength = function (callback) {
  articleModel.find({}, function (err, result) {
    callback(result.length)
  })
}

// 文章编辑保存
var saveArticle = function (article_opt, callback) {
  var newArticle = new articleModel(article_opt);
  if (article_opt.params_id) {
    var _id = article_opt.params_id
    articleModel.findOneAndUpdate({ _id: _id }, article_opt, function (err, result) {
      callback(result._id)
    })
  } else {
    newArticle.save(function (err, result) {
      callback(result._id)
    })
  }
}

// 文章删除
var deleteArticle = function (articleId, callback) {
  articleModel.remove({_id: articleId}, function (err, result) {
    console.log(result)
    callback()
  })
}

var modelHome = {
  renderArticleList: renderArticleList,
  renderArticle: renderArticle,
  renderManage: renderManage,
  getLength: getLength,
  saveArticle: saveArticle,
  deleteArticle: deleteArticle
};

module.exports = modelHome;