const express = require('express')
const cors = require('cors');
const jwt = require('./data/jwt.js');
const e = require('express');

const app = express()
const port = 3660

// 使用 CORS 中间件，允许所有跨域请求
app.use(cors());

// // 使用body-parser中间件解析POST请求体
app.use(express.json()); // 解析application/json
app.use(express.urlencoded({
  extended: true
})); // 解析application/x-www-form-urlencoded

// token

// 引入路由
require('./router/index')(app)


// 404处理
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
})

// 500错误处理
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
})



app.listen(port, () => {
  console.log(`您已经启动了 ${port}`)
})