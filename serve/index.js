var dbserver = require('../data/dbserver.js');

// 好友列表
exports.getFriendList = function (req, res) {
    // 获取请求的参数
    let uid = req.body.uid;
    let state = req.body.state;
    dbserver.getFriendList(uid,state, res)
}
// 获取最后聊天记录
exports.getLastMessage = function (req, res) {
    // 获取请求的参数
    let data = req.body;
    dbserver.getLastMessage(data, res)
}

// 未读消息unReadMsg
exports.unReadMsg = function (req, res) {
    // 获取请求的参数
    let data = req.body;
    dbserver.unReadMsg(data, res)
}
// 改变消息状态
exports.updateReadMsg = function (req, res) {
    // 获取请求的参数
    let data = req.body;
    dbserver.updateReadMsg(data, res)
}

// 群列表
exports.getGroupList = function (req, res) {
    // 获取请求的参数
    let uid = req.body.uid;
    dbserver.getGroupList(uid, res)
}
// 群消息
exports.getGroupMsg = function (req, res) {
    // 获取请求的参数
    let data = req.body;
    dbserver.getGroupMsg(data, res)
}

// 更新群消息数状态
exports.updateGroupMsg = function (req, res) {
    // 获取请求的参数
    let data = req.body;
    dbserver.updateGroupMsg(data, res)
}

