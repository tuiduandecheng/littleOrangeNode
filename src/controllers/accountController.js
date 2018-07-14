const path = require('path');
const captchapng = require('captchapng')
const MongoClient = require('mongodb').MongoClient

// Connection URL
const url = 'mongodb://localhost:27017'

// Database Name
const dbName = 'szqd18'
//暴露一个获取登录页面的方法 给路由调用
exports.getLoginPage =  (req,res) => {
    
    res.sendFile(path.join(__dirname,"../views/login.html"));
}
//暴露一个获取注册页面的方法 给路由调用
exports.getRegisterPage=  (req,res) => {
  res.sendFile(path.join(__dirname,"../views/register.html"));
}

/**
 * 暴露的返回用户注册的方法
 */
exports.register = (req,res)=>{
    const result = {
      status:0, //0代表成功，1代表用户名存在
      message:"注册成功"
  }
   const {username,password} = req.body;
// console.log(username,password);


    MongoClient.connect(url, function(err, client) {
      //拿到数据库
      const db = client.db(dbName)
      // console.log(db)
      //拿到集合
      const collection = db.collection('accountInfo')
      
       //根据传递过来的用户名去查询，看用户名存不存在
       collection.findOne({username:req.body.username},(err,doc)=>{
        if(doc==null){//不存在，插入到数据库中
            collection.insertOne(req.body,(err,result2)=>{
                if(err){
                    result.status = 2
                    result.message = "注册失败"
                }
                
                client.close();
                res.json(result)
            })

        }else{
            client.close();

            result.status = 1
            result.message = "用户名已存在"

            res.json(result)
        }
    })
  })
 
}
exports.getImageVcode = (req,res) => {
  //1.利用一个第三方的包生成 一张带数字的图片
  const random = parseInt(Math.random() * 9000 + 1000);

  //2.存起来?
      //把生成好的验证码，存在session中
      req.session.vcode = random

  var p = new captchapng(80, 30, random); // width,height,numeric captcha
  p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
  p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

  var img = p.getBase64();
  var imgbase64 = new Buffer(img, "base64");
  res.writeHead(200, {
    "Content-Type": "image/png"
  });
  

  //3.返回，并且告知是一张图片
  res.end(imgbase64);
}

exports.login = (req,res)=>{
    const result = {
        status:0, //0代表成功，1验证码不正确，2代表用户名或密码错误
        message:"注册成功"
    }

    //校验验证码
    if(req.session.vcode!=req.body.vcode){
        result.status = 1
        result.message = "验证码不正确"

        
        res.json(result)

        return
    }
   //校验用户名和密码
   MongoClient.connect(url, function(err, client) {   
    //拿到数据库    
    const db = client.db(dbName)

    //拿到要操作的集合
    const collection = db.collection('accountInfo')

    collection.findOne({username:req.body.username,password:req.body.password},(err,doc)=>{
        if(doc==null){
            result.status = 2
            result.message = "用户名或密码错误"
        }

        res.json(result)
        client.close();
    })
  });

}