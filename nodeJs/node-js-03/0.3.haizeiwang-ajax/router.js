// router模块讲一个对象导出
var controller = require('./controller');

// 对象中有相关方法，这个方法负责设置请求的监听事件
module.exports = {
    start:function(server){
        server.on('request',function(req,res){
            // 获取请求路径
            var urls = req.url;
            // 判断请求方法
            if(req.method == 'GET'){
                // 判断请求路径
                if(urls == '/'){
                    // 需要响应首页的html代码
                    // 调用控制器的index方法处理请求并传入请求对象和响应对象
                    controller.index(req,res);
                }else if(urls == '/getdata'){ // 判断ajax请求
                    // 调用业务层获取数据
                    controller.ajaxGetData(req,res);
                }else{
                    var fs = require('fs');
                    fs.readFile('.' + urls,function(err,data){
                        res.end(data);
                    });
                }
            }else if(req.method == 'POST'){

            }else{

            }
            // res.end('00')
        })
    }
}