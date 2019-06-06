var http = require('http');
var server = http.createServer();

server.listen(252);

server.on('request',function(request,response){
    if(request.method == 'GET'){
        response.setHeader('Content-Type','text/html;charset=utf-8');
        response.write('<h1>GET!</h1>');
    }else if(request.method == 'POST'){
        response.write('POST!');
    }
    response.end();
});