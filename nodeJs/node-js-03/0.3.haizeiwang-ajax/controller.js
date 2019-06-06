var fs = require('fs');
// 引入art模板引擎
var template = require('art-template');
// 修改模板加载地址
template.defaults.root = './';


module.exports = {
    // 供路由模块根据请求不同来调用
    index:function(req,res){
        // 本次请求只需要静态页面
        // 所以读取页面后直接返回即可  （页面中有html及ajax代码）
       fs.readFile('./view/index.html',function(err,data){
           res.end(data);
       })
    },
    
    // 获取数据的方法 
    ajaxGetData:function(req,res){
        // 引入数据库模块
        var model = require('./model');
        model.cha(function(backdata){
            // console.log(backdata);
            // 获取数据后，将数据响应回ajax请求
            var json_data = JSON.stringify(backdata);
            // console.log(json_data);
            res.end(json_data);
            // res.end('')
        })
    }
}