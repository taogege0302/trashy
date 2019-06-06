
//引入核心的文件系统模块
var fs= require('fs');
//先读出文件内容
fs.readFile('./a.txt','utf8',function(err,data){
    //拼接要追加的内容
     var da = data + 123;
     //重新写入文件中
     fs.writeFile('./a.txt',da,function(err){
        console.log(err);
    });
});


//异步就是代码一旦调用,不管执行时间和结果,继续执行下面的代码
//同步就是代码必须等待执行调用结束后才会继续执行下面的代码