// 数据库连接
var mongoose = require('mongoose');


var db = mongoose.createConnection('mongodb://127.0.0.1:27017/IM', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('连接数据库IM成功');
})


// 导出db
module.exports = db;

