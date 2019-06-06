var http = require('http');
var server = http.createServer();
server.listen(285);
server.on('request',function(request,response){
    if(request.method == 'GET'){
        // response.setHeader('Content-Type','text/plain;charset=utf-8');
        response.setHeader('Content-Type','text/html;charset=utf-8');
        response.write('<h1>欢迎来到我的世界!</h1>');
    }else if(request.method =='POST'){
        response.write('<h1>欢迎来到我的世界!</h1>');
    }
    response.end();
});