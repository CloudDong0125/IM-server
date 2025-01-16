// 操作数据库
// var bcrypt = require('../data/bcryptjs');
var jwt = require('../data/jwt');
var dbmodel = require('../model/dbmodel');
// var User = dbmodel.model('User');
var User = dbmodel.User;

module.exports = {
  findUserByName: async function (name) {
    console.log(name);
    try {
      return await User.findOne({
        name: name
      });
    } catch (error) {
      console.error('Error finding user by name:', error);
      throw error;
    }
  },
  // 注册
  buildUser: async function (userData) {
    if (!userData.name || userData.name === null || userData.name.trim() === '') {
      throw new Error('用户名不能为空');
    }

    // 确保 username 不为 null
    if (userData.name === null) {
      throw new Error('用户名不能为 null');
    }

    const existingUser = await this.findUserByName(userData.name);
    if (existingUser) {
      throw new Error('用户名已存在');
    }

    const newUser = new User(userData);
    try {
      return await newUser.save();
    } catch (error) {
      console.error('Error saving new user:', error);
      throw error;
    }
  },

  // ... 其他代码 ...

// 用户验证
userMatch: async function (userData, res) {
  let out = {
    'name': 1,
    'imgUrl': 1
  };

  try {
    let doc = await User.findOne({
      $and: [
        { name: userData.name },
        { pwd: userData.pwd }
      ]
    }, out);
    if (!doc) {
      console.log('用户不存在');
      res.send({
        status: 404,
        msg: '用户不存在'
      });
      return;
    }
    let token = jwt.generateToken(doc._id);
    let back = {
      id: doc._id,
      name: doc.name,
      imgUrl: doc.imgUrl, 
      token: token
    };
    res.send({
      code: 0,
      data: back
    });
  } catch (err) {

    if (res) {
      res.send({
        code: 1
      });
    }
  }
}

// ... 其他代码 ...



};