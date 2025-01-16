// 加密
var bcrypt = require('bcrypt');
exports.hashSync = function(password) {
  var salt = bcrypt.genSaltSync(10);
  // 生成hash
  var hash = bcrypt.hashSync(password, salt);
  return hash;
};

// 解密
exports.verification = function(password, hash) {
  let verif = bcrypt.compareSync(password, hash); // 对比
  return verif;
};