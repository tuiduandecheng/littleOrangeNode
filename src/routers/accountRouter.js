//导入express
const express = require("express");
const path = require("path");
//创建路由对象
const accountRouter =  express.Router();
const accountCTRL = require(path.join(__dirname,"../controllers/accountController.js"))
//当浏览器发送了login请求 先让路由判断 然后让控制器调用方法
accountRouter.get('/login',accountCTRL.getLoginPage);
//当浏览器发送了register请求 先让路由判断 然后让控制器调用方法
accountRouter.get('/register',accountCTRL.getRegisterPage);

//处理浏览器注册用户的请求
accountRouter.post('/register',accountCTRL.register)

//当浏览器发送了vcode请求 先让路由判断 然后让控制器调用方法
accountRouter.get('/vcode',accountCTRL.getImageVcode)
//处理浏览器用户的登录请求
accountRouter.post('/login',accountCTRL.login)

//暴露 路由模块
module.exports = accountRouter;
