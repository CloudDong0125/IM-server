// token
var jwt = require('jsonwebtoken');
// 加密秘钥
var secret = 'secret';

// 生成token
exports.generateToken = function (e) {
  
  let payload = {
    id: e,
    time:new Date()
  };
  
 
  let token = jwt.sign(payload, secret, {
    expiresIn: 60 * 60 * 24 // 24小时过期
  });
  return token;
  
};

// 解绑token
exports.unbindToken = function (token) {
  // 解密token
  let decoded = jwt.verify(token, secret);
  // 解绑token
  return decoded;
};