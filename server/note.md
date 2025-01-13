250113

0、初始化

express文档地址

```
https://www.expressjs.com.cn/starter/hello-world.html
```



1、新建node项目express

```bash
server % cnpm i express@next mongoose cors
```



2、测试代码

```js
const express = require('express')
const app = express()
const port = 3666

app.get('/', (req, res) => {
  res.send('Hello World!1')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

3、启动
```js
 server % nodemon app.js
```

4、关于基础的400 和 500 错误处理

5、建立新的路由文件

6、关于跨域的处理