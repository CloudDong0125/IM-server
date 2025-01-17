var signup = require('../serve/signup');
var signin = require('../serve/signin');
var search = require('../serve/search');
var jsonwebtoken = require('jsonwebtoken'); // 避免命名冲突
var secret = 'secret'; // 加密秘钥


function checkToken(req, res, next) {
  // 排除注册和登录接口
  if (req.path === '/signup/add' || req.path === '/signin') {
    return next();
  }

  // 获取请求头中的token
  const token = req.headers.token;
  console.log(req.headers.token);

  if (!token) {
    return res.status(401).send('未提供token');
  }

  // 验证token
  jsonwebtoken.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send('无效的token');
    }

    // 将解码后的用户信息存储在请求对象中
    req.user = decoded;
    next();
  });
}


module.exports = function (app) {
  // 使用token检查中间件
  app.use(checkToken);
  // 测试
  app.get('/test', (req, res) => {
    res.send('Hello World!');
  });

  // 注册
  app.post('/signup/add', (req, res) => {
    signup.buildUser(req, res);
  });
  // 登录
  app.post('/signin', (req, res) => {
    signin.login(req, res);
  });

  // --------搜索
  // 搜索用户
  app.post('/searchUser', (req, res) => {
    search.searchUser(req, res);
  });
  // 判断是否为好友
  app.post('/isFriend', (req, res) => {
    search.isFriend(req, res);
  });
  // 搜索群
  app.post('/searchGroup', (req, res) => {
    search.searchGroup(req, res);
  });
  // 判断是否在群
  app.post('/isInGroup', (req, res) => {
    search.isInGroup(req, res);
  });

};