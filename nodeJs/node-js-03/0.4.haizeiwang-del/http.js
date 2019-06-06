// http模块只负责服务器创建及启动
var http = require('http');
var server = http.createServer();
server.listen(8083,function(){
    console.log('服务器启动成功，请访问 http://127.0.0.1:8083');
})

// 请求事件的监听及处理工作，交给router模块 
// 导入router 调用相关方法并传入server对象用于事件绑定监听
var router = require('./router');
router.start(server);
