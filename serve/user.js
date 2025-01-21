var dbserver = require('../data/dbserver.js');

// 详情
exports.userDetail = function(req,res) {
    let id = req.body.id;
    console.log(id,'id')
    dbserver.userDetail(id,res)
}
// 用户昵称修改
exports.updateUserNickname = function(req,res) {
    let userData = req.body;
    dbserver.updateUserNickname(userData,res)
}
