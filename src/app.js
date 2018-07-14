// 导入express
const express = require('express');
const path  = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
// 创建app
const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Use the session middleware
app.use(session({ secret: 'keyboard cat', resave:true, saveUninitialized:true, cookie: { maxAge: 10*60000 }}))

//node中处理静态资源
app.use(express.static(path.join(__dirname,"statics")))
//3.0 集成路由中间件
const accountRouter = require(path.join(__dirname,"./routers/accountRouter.js"))
app.use('/account',accountRouter)

const studentManagerRouter = require(path.join(__dirname,'./routers/studentManagerRouter.js'))
app.use('/studentmanager',studentManagerRouter)
//开启
app.listen(3000,'127.0.0.1',err => {
    if(err) {
        console.log(err)
    }
    console.log('orange OK')
})