const express = require('express')
const app = express()
const port = 3666

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// 引入路由
require('./router/index')(app)

// 404处理
app.use(function(req,res,next){
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
})

// 500错误处理
app.use(function(err,req,res,next){
  res.status(err.status || 500);
  res.send(err.message);
})

app.listen(port, () => {
  console.log(`您已经启动了 ${port}`)
})