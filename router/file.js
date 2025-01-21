const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
var mkdir = require('../data/mkdir');
// 控制文件的存储
const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        // 存储路径
        let url = req.body.url;
        if (!url) {
            return cb(new Error('URL is required'));
        }
        const uploadPath = path.join(__dirname, '../uploads', url); // 使用绝对路径
        await mkdir(uploadPath);
        cb(null, uploadPath); // 存储路径
    },
    
    filename: function (req, file, cb) {
        // 正则匹配文件后缀 -- .jpg .png .gif
        const reg = /.+\./;
        const ext = file.originalname.replace(reg, '.');
      
        const now = new Date(Date.now());
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const uniqueSuffix = `${year}${month}${day}${hours}${minutes}${seconds}-${Math.round(Math.random() * 1E9)}`;

        cb(null, uniqueSuffix + ext); // 存储文件名
    }
});
// 设置文件大小限制为 5MB
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});
// 使用中间件   用于解析请求体中的数据
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = function (app) {
    // 前端文件上传多个
    app.post('/files/upload', upload.array('file', 10), function (req, res, next) {
        // 获取文件信息
        
        let data = req.files;
        let userId = req.body.userId;
        res.send({
            code: 200,
            data:{userId:userId,filename:data[0].filename,},
        });
    });
};
