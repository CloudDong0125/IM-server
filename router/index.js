var signup = require('../serve/signup'); // 引入注册模块
var signin = require('../serve/signin'); // 引入登录模块
var search = require('../serve/search'); // 引入搜索模块
var user = require('../serve/user'); // 引入用户模块
var friend = require('../serve/friend'); // 引入好友模块
var index = require('../serve/index'); // 引入好友列表模块
var jsonwebtoken = require('jsonwebtoken'); // 避免命名冲突
var secret = 'secret'; // 加密秘钥


function checkToken(req, res, next) {
  // 排除注册和登录接口
  if (req.path === '/signup/add' || req.path === '/signin') {
    return next();
  }

  // 获取请求头中的token
  const token = req.headers.token;
  // console.log(req.headers.token);

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

  // ---
  // 用户详情
  app.post('/userDetail', (req, res) => {
    user.userDetail(req, res);
  });
  // 修改用户昵称
  app.post('/updateUserNickname', (req, res) => {
    user.updateUserNickname(req, res);
  });


  // ---好友申请
  // 好友申请
  app.post('/friend/applyFriend', (req, res) => {
    friend.applyFriend(req, res);
  });
  // 同意好友
  app.post('/friend/updataFriendState', (req, res) => {
    friend.updataFriendState(req, res);
  });
  // 删除好友
  app.post('/friend/deleteFriend', (req, res) => {
    friend.deleteFriend(req, res);
  });

  // ---好友列表
  // 好友列表
  app.post('/index/getFriendList', (req, res) => {
    index.getFriendList(req, res);
  });
  // 获取最后聊天记录
  app.post('/index/getLastMessage', (req, res) => {
    index.getLastMessage(req, res);
  });
  // 未读消息
  app.post('/index/unReadMsg', (req, res) => {
    index.unReadMsg(req, res);
  });
  // 改变消息状态
  app.post('/index/updateReadMsg', (req, res) => {
    index.updateReadMsg(req, res);
  });

};