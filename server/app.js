const express = require('express')
const cors = require('cors');
const app = express()
const port = 3660

// 使用 CORS 中间件，允许所有跨域请求
app.use(cors());

// // 使用body-parser中间件解析POST请求体
app.use(express.json()); // 解析application/json
app.use(express.urlencoded({ extended: true })); // 解析application/x-www-form-urlencoded

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// // 注册接口
// app.post('/register', (req, res) => {
//   const { name, pwd } = req.body;
//   // 这里可以添加对name和pwd的验证逻辑
//   // 例如，检查name是否已存在于数据库中
//   // 如果验证通过，可以将用户信息保存到数据库中
//   // 这里我们只是简单地返回一个成功消息
//   res.json({ code:0,data:{name,pwd},message: '注册成功' });
// });
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