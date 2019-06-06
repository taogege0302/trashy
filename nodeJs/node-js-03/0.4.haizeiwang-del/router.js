// router模块讲一个对象导出
var controller = require('./controller');

// 对象中有相关方法，这个方法负责设置请求的监听事件
module.exports = {
    start:function(server){
        server.on('request',function(req,res){
            var urls = req.url;
            // console.log(urls);
            // 引入url模块 调用parse方法，对url地址进行解析 j解析为一个对象,
            var url = require('url');
            // 解析url地址时(parse()方法) 如果没有第二个参数，那么url传过来的参数就是一个字符串(’id=4‘)
            // 第二个参数如果为true,会将url传过来的参数也转为对象
            var u = url.parse(req.url,true);

            // 判断请求方法
            if(req.method == 'GET'){
                // 判断请求路径
                if(u.pathname == '/'){
                    // 需要响应首页的html代码
                    // 调用控制器的index方法处理请求并传入请求对象和响应对象
                    controller.index(req,res);
                }else if(u.pathname == '/getone'){
                    // console.log(123);
                    controller.getone(req,res,u.query.id);
                }else if(u.pathname == '/del'){
                    controller.del(req,res,u.query.id);
                }else{
                    var fs = require('fs');
                    fs.readFile('.'+urls,function(err,data){
                        res.end(data);
                    })
                }
            }else if(req.method == 'POST'){

            }else{

            }
            // res.end('00')
        })
    }
}