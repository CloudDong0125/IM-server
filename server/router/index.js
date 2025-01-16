var express = require('express');
var dbserver = require('../data/dbserver.js');
var signup = require('../serve/signup');
var signin = require('../serve/signin');
module.exports = function (app) {
  // 测试
  app.get('/test', (req, res) => {
    res.send('Hello World!');
  });
  // 注册
  app.post('/signup/add', (req, res) => {
    signup.buildUser(req, res);
  });

  // 登录
  app.post('/signin', (req, res) => {
    signin.login(req, res);
  });

};