// 操作数据库
// var bcrypt = require('../data/bcryptjs');
var jwt = require('../data/jwt');
var dbmodel = require('../model/dbmodel');

var User = dbmodel.User;
var Friend = dbmodel.Friend;
var Message = dbmodel.Message;
var Group = dbmodel.Group;
var GroupUser = dbmodel.GroupUser;


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
  // 用户信息修改（较复杂--暂未完善）
  userUpdate: async function (userData, res) {
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

  },
  // 用户昵称修改（暂未完善）
  updateUserNickname: async function (userData, res) {
    console.log(userData);
    // $or 操作符来指定多个条件，只要满足其中一个条件，记录就会被匹配。
    let wherestr = {
      $or: [{
        'userID': userData.uid,
        'friendID': userData.fid
      }, {
        'userID': userData.fid,
        'friendID': userData.uid
      }]
    };
    let updatestr = {
      'nickName': userData.name
    };

    try {
      var result = await Friend.update(wherestr, updatestr);
      if (result.matchedCount === 0) {
        res.send({
          code: 404,
          msg: '用户不存在'
        });
        return;
      }
      res.send({
        code: 0,
        data: result
      });
    } catch (err) {
      res.send({
        code: 1
      });
    }
  },

  // ---好友申请；拒绝/删除好友、同意好友
  /**
   * 更新好友最后通讯时间的函数
   * @param {string} uid - 用户ID
   * @param {string} fid - 好友ID
   * @param {Object} res - 响应对象
   */
  upFriendLastTime: async function (uid, fid, res) {
    let wherestr = {
      $or: [{
          userId: uid,
          friendId: fid
        },
        {
          userId: fid,
          friendId: uid
        }
      ]
    };
    let updatestr = {
      'lastTime': new Date()
    };
    try {
      var result = await Friend.updateMany(wherestr, updatestr);
      if (!res.headersSent) {
        // res.send({
        //   code: 0,
        //   data: {
        //     acknowledged: result.acknowledged,
        //     modifiedCount: result.modifiedCount
        //   }
        // });
      }
    } catch (err) {
      console.log('好友最后更新通讯时间出错', err);
      if (!res.headersSent) {
        res.send({
          code: 1,
          error: err.message
        });
      }
    }
  },

  /**
   * 处理好友申请、拒绝/删除好友、同意好友的函数
   * @param {string} uid - 用户ID
   * @param {string} fid - 好友ID
   * @param {number} state - 好友状态（2: 申请中，1: 已同意，0: 已拒绝）
   * @param {Object} res - 响应对象
   */
  buildFriend: async function (uid, fid, state, res) {
    let back = {
      'userId': uid,
      'friendId': fid,
      'state': state,
      'time': new Date(),
      'lastTime': new Date()
    };
    let friend = new Friend(back);
    try {
      var result = await friend.save();
      if (!res.headersSent) {
        // res.send({
        //   code: 0,
        //   data: result
        // });
      }
    } catch (err) {
      console.log('申请好友出错', err);
      if (!res.headersSent) {
        res.send({
          code: 1,
          error: err.message
        });
      }
    }
  },

  /**
   * 添加一对一消息：申请词
   * @param {string} uid - 用户ID
   * @param {string} fid - 好友ID
   * @param {string} msg - 消息内容
   * @param {number} type - 消息类型
   * @param {Object} res - 响应对象
   */
  insertMsg: async function (uid, fid, msg, type, res) {
    let back = {
      userId: uid,
      friendId: fid,
      message: msg,
      types: type,
      time: new Date(),
      state: 1,
    };
    let message = new Message(back);
    try {
      var result = await message.save();
      if (!res.headersSent) {
        res.send({
          code: 0,
          data: result
        });
      }
    } catch (err) {
      console.log('添加消息出错', err);
      if (!res.headersSent) {
        res.send({
          code: 1,
          error: err.message
        });
      }
    }
  },

  /**
   * 好友申请
   * @param {Object} data - 包含用户ID、好友ID和消息内容的对象
   * @param {Object} res - 响应对象
   */
  applyFriend: async function (data, res) {
    console.log(data, '---------------------------');
    let wherestr = {
      'userId': data.uid,
      'friendId': data.fid
    };
    try {
      let count = await Friend.countDocuments(wherestr);
      if (count > 0) {
        await this.upFriendLastTime(data.uid, data.fid, res);
      } else {
        await this.buildFriend(data.uid, data.fid, 2, res);
        await this.buildFriend(data.fid, data.uid, 1, res);
      }
      await this.insertMsg(data.uid, data.fid, data.msg, 0, res);
    } catch (err) {
      console.log('好友申请出错', err);
      if (!res.headersSent) {
        res.send({
          code: 1,
          error: err.message
        });
      }
    }
  },
  /**
   * 同意好友
   * @param {Object} data - 包含用户ID、好友ID和消息内容的对象
   * @param {Object} res - 响应对象
   */
  updataFriendState: async function (data, res) {
    // 搜索条件
    let wherestr = {
      $or: [{
        'userId': data.uid,
        'friendId': data.fid
      }, {
        'userId': data.fid,
        'friendId': data.uid
      }]
    };
    let updatestr = {
      'state': 0
    };
    try {
      var result = await Friend.updateMany(wherestr, updatestr);
      if (result.matchedCount === 0) {
        res.send({
          code: 404,
          msg: '用户不存在'
        });
        return;
      }
      res.send({
        code: 0,
        message: '好友状态更新成功',
        data: {
          modifiedCount: result.modifiedCount,
          matchedCount: result.matchedCount
        }
      });
      console.log(result)
    } catch (err) {
      res.send({
        code: 1
      });
      console.log(err)
    }
  },
  /**
   * 拒绝或删除好友
   * @param {Object} data - 包含用户ID、好友ID和消息内容的对象
   * @param {Object} res - 响应对象
   * @param {number} state - 好友状态（2: 申请中，1: 已同意，0: 已拒绝）
   */
  deleteFriend: async function (data, res, state) {
    let wherestr = {
      $or: [{
        'userId': data.uid,
        'friendId': data.fid
      }, {
        'userId': data.fid,
        'friendId': data.uid
      }]
    };
    let updatestr = {
      'state': state
    };

    try {
      var result = await Friend.deleteMany(wherestr, updatestr);
      if (result.matchedCount === 0) {
        res.send({
          code: 404,
          msg: '用户不存在'
        });
        return;
      }
      res.send({
        code: 0,
        message: '好友状态更新成功',
        data: {
          modifiedCount: result.modifiedCount,
          matchedCount: result.matchedCount
        }
      });
    } catch (err) {
      res.send({
        code: 1
      });
    }
  },



};