// 搜素
var dbserver = require('../data/dbserver.js');

// 用户搜索
exports.searchUser = async function(req, res) {
    var name = req.body.name
    console.log(name,'search');
  
    var userData = {
        name: name
    };
   
    dbserver.searchUser(userData, res);
};

// 判断是否为好友
exports.isFriend = async function(req, res) {
    var uid = req.body.uid;
    var fid = req.body.fid;
    console.log(uid, fid,'isFriend');
   
    // 将 name 和 pwd 合并成一个对象
    var userData = {
        uid: uid,
        fid: fid
    };

    dbserver.isFriend(userData, res);
};

// 群搜索
exports.searchGroup = async function(req, res) {
    var name = req.body.name;
    var pwd = req.body.pwd;
    console.log(name, pwd,'search');
   
    var userData = {
        name: name,
        pwd: pwd
    };
   
    dbserver.searchGroup(userData, res);
};

// 判断是否在群
exports.isInGroup = async function(req, res) {
    var uid = req.body.uid;
    var gid = req.body.gid;
    console.log(uid, gid,'search');
    
    var userData = {
        uid: uid,
        gid: gid
    };
    dbserver.isInGroup(userData, res);
};

