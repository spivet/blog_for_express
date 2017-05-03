var mongoose = require('mongoose');

var user = mongoose.model('user', {
  account: String,
  password: String,
  name: String
});

var renderLogin = function (username, password, callback) {
  var info = null;
  if (username === 'false') {
    info = { success: false, msg: '用户名不存在' };
  }
  if (password === 'false') {
    info = { success: false, msg: '密码错误' };
  }
  callback(info)
};

var checkUser = function (username, password, callback) {
  user.find({ account: username }, function (err, result) {
    if (err) {
      console.log(err)
    }

    if (result.length === 0) {
      callback('/login?username=false')
    } else {
      if (password === result[0].password) {
        callback('/')
      } else {
        callback('/login?password=false')
      }
    }
  })
};

var modelLogin = {
  renderLogin: renderLogin,
  checkUser: checkUser
}
module.exports = modelLogin;