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
        type: Number,// 0为好友、1为申请、2为拒绝 
    },
    nickName:{ // 备注名称
        type: String,
        default: ''
    },
    time: {
        type: Date,
        default: Date.now
    },
    lastTime: {  // 最后聊天时间
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
    types: { // 消息类型
        type: Number,
        default: 0 // 0 文本 1 图片 2 语音 3 视频 4 文件
    },
    state:{ // 消息状态
        type: Number,
        default: 0 // 0 未读 1 已读
    },
    time: {
        type: Date
    },
})
// 群组表
var GroupSchema = new Schema({
    userId: { // 用户名
        type: Schema.Types.ObjectId,ref:'User',
    },
    name:{
        type: String,
    },
    imgUrl:{
        type: String,
        default:'group.png'
    },
    time: {
        type: Date,
        default: Date.now
    },
    notice:{ // 群公告
        type: String,
        default: ''
    },
   
})

// 群成员表
var GroupUserSchema = new Schema({
    
    groupId: { // 群组id
        type: Schema.Types.ObjectId,ref:'Group',
        default: ''
    },
    userId: { // 用户名
        type: Schema.Types.ObjectId,ref:'User',
    },
    name:{type:String},
    tip:{type:Number,default:0},
    time: {
        type: Date,
        default: Date.now
    },
    lastTime: { // 最后聊天时间
        type: Date,
        default: Date.now
    },
    shield:{ // 屏蔽消息
        type: Number,
        default: 0 // 0 不屏蔽 1 屏蔽
    },
})
// 群消息表
var GroupMsgSchema = new Schema({
    groupId: { // 群组id
        type: Schema.Types.ObjectId,ref:'Group',
        default: ''
    },
    userId: { // 用户名
        type: Schema.Types.ObjectId,ref:'User',
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
    time: {
        type: Date
    },
})

// 导出所有模型
module.exports = {
    User: db.model('User', UserSchema),
    Friend: db.model('Friend', FriendSchema),
    Message: db.model('Message', MessageSchema),
    Group: db.model('Group', GroupSchema),
    GroupUser: db.model('GroupUser', GroupUserSchema),
    GroupMsg: db.model('GroupMsg', GroupMsgSchema),
};