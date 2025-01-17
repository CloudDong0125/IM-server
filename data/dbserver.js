// 操作数据库
// var bcrypt = require('../data/bcryptjs');
var jwt = require('../data/jwt');
var dbmodel = require('../model/dbmodel');

var User = dbmodel.User;
var Friend = dbmodel.Friend;
var Group = dbmodel.Group;
var GroupMember = dbmodel.GroupMember;
var GroupMessage = dbmodel.GroupMessage;

module.exports = {
  // 注册前查找用户
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

  // ----------
  // 用户验证
  userMatch: async function (userData, res) {
    // 输出给前端的内容
    let out = {
      'name': 1,
      'imgUrl': 1
    };

    try {
      let doc = await User.findOne({
        $and: [ // $and 操作符，用于同时匹配多个条件
          {
            name: userData.name
          },
          {
            pwd: userData.pwd
          }
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
  },

  // ----------
  // 搜索用户(模糊查询)
  searchUser: async function (userData, res) {
    if (!userData || !userData.name) {
      return res.send({
        code: 404,
        msg: '用户不存在'
      });
    }

    var wherestr = {};
    if (userData.name !== 'im') {
      wherestr = {
        $and: [{
          name: {
            $regex: userData.name
          }
        }]
      };
    }

    var out = {
      'name': 1,
      'imgUrl': 1,
    };
    try {
      var doc = await User.find(wherestr, out); // 用户搜索
      if (!doc || doc.length === 0) {
        return res.send({
          code: 404,
          msg: '用户不存在'
        });
      }
      res.send({
        code: 0,
        data: doc
      });
    } catch (err) {
      console.log(err);
      res.send({
        code: 1,
      });
    }
  },

  // 用户匹配-- 判断是否为好友 Friend表
  isFrind: async function (uid, fid, res) {
    let wherestr = {
      'userId': uid,
      'friendId': fid,
      'state': 0
    };
    try {
      var doc = await Friend.findOne(wherestr);
      if (!doc) {
        res.send({
          code: 404,
          msg: '用户不存在'
        });
        return;
      }
      res.send({
        code: 0,
        data: doc
      });
    } catch (err) {
      res.send({
        code: 1
      });
    }
  },

  // 搜素群
  searchGroup: async function (data, res) {
    var wherestr = {}
    if (data == 'im') {
      wherestr = {};
    } else {
      wherestr = {
        $and: [{
          name: {
            $regex: data
          }
        }]
      };
    }

    var out = {
      'groupName': 1,
      'groupImg': 1,
    };
    try {
      var doc = await Group.find(wherestr, out); // 用户搜索
      if (!doc) {
        res.send({
          code: 404,
          msg: '用户不存在'
        });
        return;
      }
      res.send({
        code: 0,
        data: doc
      });
    } catch (err) {
      res.send({
        code: 1
      });
    }
  },
  // 群匹配
  isInGroup: async function (uid, gid, res) {
    let wherestr = {
      'userId': uid,
      'groupId': gid,
    };
    try {
      var doc = await GroupMember.findOne(wherestr);
      if (!doc) {
        res.send({
          code: 404,
          msg: '用户不存在'
        });
        return;
      }
      res.send({
        code: 0,
        data: doc
      });
    } catch (err) {
      res.send({
        code: 1
      });
    }
  },

  // -----
  // 用户详情
  userDetail: async function (id, res) {
    var wherestr = {
      '_id': id
    };
    var out = {
      'name': 1,
      'imgUrl': 1,
    };
    try {
      var doc = await User.findOne(wherestr, out);
      if (!doc) {
        res.send({
          code: 404,
          msg: '用户不存在'
        });
        return;
      }
      res.send({
        code: 0,
        data: doc
      });
    } catch (err) {
      res.send({
        code: 1
      });
    }
  },
  // 用户信息修改（较复杂）
  userUpdate: async function (userData,res) {
    let updatestr = {}
    if (userData.name) {
      updatestr.name = userData.name
    }
    if (userData.imgUrl) {
      updatestr.imgUrl = userData.imgUrl
    }
    if (userData.pwd) {
      updatestr.pwd = userData.pwd
    }
    let wherestr = {
      '_id': userData.id
    };
    
  }



};