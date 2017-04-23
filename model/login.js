var mongoose = require('mongoose');

var user = mongoose.model('user', {
  account: String,
  password: String,
  name: String
});

var renderLogin = function (req, res) {
  var info = null;
  if (req.query.username === 'false') {
    info = { username: req.query.username };
  }
  if (req.query.password === 'false') {
    info = { password: req.query.password };
  }
  res.render('../views/pages/login', info)
};

var checkUser = function (req, res) {
  user.find({ account: req.body.username }, function (err, result) {
    if (err) {
      console.log(err)
    }

    if (result.length === 0) {
      res.redirect('/login?username=false')
    } else {
      if (req.body.password === result[0].password) {
        res.redirect('/')
      } else {
        res.redirect('/login?password=false')
      }
    }
  })
};

var modelLogin = {
  renderLogin: renderLogin,
  checkUser: checkUser
}
module.exports = modelLogin;