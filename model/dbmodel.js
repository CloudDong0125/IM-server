var mongoose = require('mongoose');
var db = require('../config/db.js');
var Schema = mongoose.Schema;

// 用户表 
var UserSchema = new Schema({
    // 唯一id
    id: {
        type: String,
        default: new mongoose.Types.ObjectId()
    },
    name: { // 用户名
        type: String,
        required: true,
        default: 'default_username'
    },
    pwd: { // 密码
        type: String,
        required: true,
    },
    imgUrl: { // 头像
        type: String,
        default: 'user.png'
    },
    time: {
        type: Date,
        default: Date.now
    },
})
// 好友表
var FriendSchema = new Schema({
    userId: { // 用户名
         type: Schema.Types.ObjectId, ref: 'User'
    },
    friendId: { // 好友id
        type: Schema.Types.ObjectId,ref:'User',
    },
    state: { // 好友状态
        type: Number,
        default: 0 // 0 未添加 1 已添加 2 已拒绝 3 已删除
    },
    time: {
        type: Date,
        default: Date.now
    },
})

// 一对一聊天表
var MessageSchema = new Schema({
    userId: { // 用户名
        type: Schema.Types.ObjectId,ref:'User',
    },
    friendId: { // 好友id
        type: Schema.Types.ObjectId,ref:'User',
    },
    messageId: { // 聊天id
        type: String,
        default: ''
    },
    message: { // 消息
        type: String,
        default: ''
    },
    messageType: { // 消息类型
        type: Number,
        default: 0 // 0 文本 1 图片 2 语音 3 视频 4 文件
    },
    messageStatue:{ // 消息状态
        type: Number,
        default: 0 // 0 未读 1 已读
    },
    create_time: {
        type: Date
    },
})
// 群组表
var GroupSchema = new Schema({
    userId: { // 用户名
        type: Schema.Types.ObjectId,ref:'User',
    },
    groupId: { // 群组id
        type: String,
        default: ''
    },
    groupName: { // 群组名称
        type: String,
        default: ''
    },
    groupAvatar: { // 群组头像
        type: String,
        default: 'group.png'
    },
    groupOwner: { // 群主id
        type: Schema.Types.ObjectId,ref:'User',
    },
    groupMember: { // 群成员id
        type: Array,
        default: []
    },
    groupType: { // 群组类型
        type: Number,
        default: 0 // 0 公开 1 私密 2 加密
    },
    groupNotice: { // 群组公告
        type: String,
        default: ''
    },
    create_time: {
        type: Date,
        default: Date.now
    },
})

// 群成员表
var GroupMemberSchema = new Schema({
    userId: { // 用户名
        type: Schema.Types.ObjectId,ref:'User',
    },
    groupId: { // 群组id
        type: Schema.Types.ObjectId,ref:'Group',
        default: ''
    },
    groupMemberId: { // 群成员id
        type: Schema.Types.ObjectId,ref:'User',
    },
    groupMemberName: { // 群成员名称
        type: String,
        default: ''
    },
    groupMemberAvatar: { // 群成员头像
        type: String,
        default: 'user.png'
    },
    groupMemberRole: { // 群成员角色
        type: Number,
        default: 0 // 0 普通成员 1 管理员 2 群主
    },
    create_time: {
        type: Date,
        default: Date.now
    },
})
// 群消息表
var GroupMessageSchema = new Schema({
    userId: { // 用户名
        type: Schema.Types.ObjectId,ref:'User',
    },
    groupId: { // 群组id
        type: Schema.Types.ObjectId,ref:'Group',
        default: ''
    },
    groupMessageId: { // 群消息id
        type: String,
        default: ''
    },
    groupMessage: { // 群消息
        type: String,
        default: ''
    },
    groupMessageType: { // 群消息类型
        type: Number,
        default: 0 // 0 文本 1 图片 2 语音 3 视频 4 文件
    },
    groupMessageStatue:{ // 群消息状态
        type: Number,
        default: 0 // 0 未读 1 已读
    },
    create_time: {
        type: Date
    },
})

// 导出所有模型
module.exports = {
    User: db.model('User', UserSchema),
    Friend: db.model('Friend', FriendSchema),
    Message: db.model('Message', MessageSchema),
    Group: db.model('Group', GroupSchema),
    GroupMember: db.model('GroupMember', GroupMemberSchema),
    GroupMessage: db.model('GroupMessage', GroupMessageSchema),
};