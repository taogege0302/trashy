//引入核心的http模块
var http = require('http');

//使用http模块的createServer方法(创建)获取服务器对象
var server  = http.createServer();

//监听端口
server.listen(250);

//为服务器设置请求事件,当客户端请求时,执行回调函数

server.on('request',function(request,response){
    if(request.method == 'GET'){
        response.write('<h1>hello world GET!</h1>');
    }else if(request.method == 'POST'){
        response.write('<h1>hello world POST!</h1>');
    }
    response.end();
});
