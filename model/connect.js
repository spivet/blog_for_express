var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://192.168.x.xxx/lhzTest');

db.connection.on('error', function (error) {
  console.log('数据库连接失败：' + error); 
})

db.connection.on('open', function () {
  console.log('数据库连接成功！')
})

module.exports = db