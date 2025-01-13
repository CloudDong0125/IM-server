module.exports = function(app) {
  app.get('/test', (req, res) => res.send('这是一个test测试路由'))
  app.get('/test2', (req, res) => res.send('这是一个test2测试路由'))
}