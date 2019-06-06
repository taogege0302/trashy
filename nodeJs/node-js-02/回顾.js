//向文件中自写入内容
var fs = require('fs');
// $data = '因为我不知道,下一辈子还是否能遇见你';
// fs.writeFile('./a.txt',$data,function(err){
//     console.log(err);
// });



//读取文件内容

// fs.readFile('./a.txt','UTF8',function(err,data){
//     console.log(err);
//     console.log(data);
// });


//服务器
var http = require('http');

var server = http.createServer();

server.listen(253);

server.on('request',function(request,response){
    if(request.method == 'GET'){
        response.setHeader('Cotent-Type','text/html;charset=utf-8');
        response.write('<h1>GET!</h1>');
    }else{
        response.write('kjehfs!');
    }
    response.end();
});