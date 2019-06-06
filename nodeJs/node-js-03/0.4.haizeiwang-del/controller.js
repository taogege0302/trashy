var fs = require('fs');
var model = require('./model');

// 引入art模板引擎
var template = require('art-template');
// 修改模板加载地址
template.defaults.root = './';


module.exports = {

    getone: function (req, res, id) {
        // model.where('id=2').select(function(){})
        // model.select(function(){})

        // 链式操作
        // 调用model中的where方法 返回值 必须是model本身，然后才能继续调用model对象中的select方法；
        // 同时在调用where方法时传入sql的where条件
        model.where('id=' + id).select(function (backdata) {
            var htmls = template('./view/one.html', backdata[0])
            res.end(htmls);
        })


        // Db::table('users')->where('id=1')->select();

        // 1:根据id查数据
        // model.getone(id, function (backdata) {
        //     // console.log(456)
        //     // 2: 获取数据与页面整合做出响应
        //     // console.log(backdata);
        //     // var htmls = template('./view/one.html',{data:backdata})
        //     var htmls = template('./view/one.html',backdata[0])
        //     res.end(htmls);
        // });
    },

    // 供路由模块根据请求不同来调用
    index: function (req, res) {
        // 链式操作实现查询
        model.select(function (d) {
            var htmls = template('./view/index.html', { data: d })
            res.end(htmls);
        })


        // 查询数据

        // console.log(model);
        // 利用回调函数获取数据库数据
        // model.cha(function (d) {
        //     // 从数据库获取到数据之后
        //     // 调用模板引擎 将模板和数据进行整合
        //     // 模板引擎会将整合好的数据返回给我们   （需要模板使用模板语法进行遍历）
        //     var htmls = template('./view/index.html', { data: d })
        //     // console.log(htmls);
        //     // 我们只需要将整合好的数据原样响应回浏览器即可
        //     res.end(htmls);
        // });

        // 将获取到的数据库的数据与读取到的页面进行整合后响应回浏览器
    },
    del:function(req, res,id){
        model.where('id=' + id).del(function (backdata) {
            if(backdata.affectedRows >= 1){
                var str = '<script>alert("删除成功");location.href="/";</script>'
                res.setHeader('Content-type','text/html;charset=utf-8');
                res.end(str);
            }
        })
    }
}