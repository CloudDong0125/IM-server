var dbserver = require('../data/dbserver.js');

// 好友申请
exports.applyFriend = function (req, res) {
    let userData = req.body;
    dbserver.applyFriend(userData, res)
}
// 同意好用--更新好友状态即可
exports.updataFriendState = function (req, res) {
    let userData = req.body;
    dbserver.updataFriendState(userData, res)
}
// 删除好友
exports.deleteFriend = function (req, res) {
    let userData = req.body;
    dbserver.deleteFriend(userData, res)
}