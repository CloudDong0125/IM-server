
var express = require('express');
var dbserver = require('../data/dbserver.js');
var signup = require('../serve/signup');

module.exports = function(app) {
    // 测试
    app.get('/test', (req, res) => {
      res.send('Hello World!');
    });
   // 注册
   app.post('/signup/add', (req, res) => {
    signup.buildUser(req, res);
  });
    
};

