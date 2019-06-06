//加载http模块
var http = require('http');
//创建服务
var server = http.createServer();

//监听端口
server.listen('1234',function(){
    console.log('启动服务成功,请访问 http://127.0.0.1:1234');
});

//导入router模块,调用方法并传入server对象,用于时间监听并处理
var router = require('./router.js');
router.start(server);