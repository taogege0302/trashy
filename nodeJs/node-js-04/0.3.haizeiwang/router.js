// router模块讲一个对象导出
var controller = require('./controller');
var querystring = require('querystring');
var fs = require('fs');

// 对象中有相关方法，这个方法负责设置请求的监听事件
module.exports = {
    start: function (server) {
        server.on('request', function (req, res) {
            var urls = req.url;
            // console.log(urls);
            // 引入url模块 调用parse方法，对url地址进行解析 j解析为一个对象,
            var url = require('url');
            // 解析url地址时(parse()方法) 如果没有第二个参数，那么url传过来的参数就是一个字符串(’id=4‘)
            // 第二个参数如果为true,会将url传过来的参数也转为对象
            var u = url.parse(req.url, true);

            // 判断请求方法
            if (req.method == 'GET') {
                // 判断请求路径
                if (u.pathname == '/') {
                    // 需要响应首页的html代码
                    // 调用控制器的index方法处理请求并传入请求对象和响应对象
                    controller.index(req, res);
                } else if (u.pathname == '/getone') {
                    // console.log(123);
                    controller.getone(req, res, u.query.id);
                    // 判断请求是不是删除请求
                } else if (u.pathname == '/deluser') {
                    // 调用业务层的deletes方法并请求响应对象和要删除的用户id
                    controller.deletes(req, res, u.query.id);
                } else if (u.pathname == '/edit') {
                    controller.editShow(req, res, u.query.id);
                } else if (u.pathname == '/addshow') {
                    // 展示添加用户页面
                    controller.addShow(req, res);
                } else {
                    
                    fs.readFile('.' + urls, function (err, data) {
                        res.end(data);
                    })
                }
            } else if (req.method == 'POST') {
                // 修改用户post请求
                // 请求路径是updateuser
                if (u.pathname == '/updateuser') {
                    // 引入fd，完成表单数据的获取及遍历 
                    // 从此就不在需要我们自己绑定 data和end事件来处理post请求
                    var formidable = require('formidable')
                    var fd = new formidable.IncomingForm();
                    // 获取fd对象
                    // 调用fd对象的parse方法将整个请求对象传入 
                    // fd 就会帮我们处理真个post请求的所有数据，并在处理完成后调用回调函数
                    // 将处理好的数据通过回调函数传回
                    fd.parse(req,function(err,formd,files){
                        // console.log(err)
                        // console.log(formd)
                        // console.log(files)
                        var imgpath = './public/img/'+files.img.name; // 设置文件移动路径
                        // 利用fs移动已经上传过后的文件到指定的位置
                        fs.rename(files.img.path,imgpath,function(err){
                            if(!err){
                                // console.log('移动文件成功')
                                // 将移动后的文件地址写入对象，传入业务层调用数据库写入数据
                                formd.img = imgpath;
                                controller.editUser(req,res,u.query.id,formd)
                            }
                        });
                    })

                } else if (u.pathname == '/adduser') {
                    var formidable = require('formidable');
                    var fd = new formidable.IncomingForm();
                    fd.parse(req,function(err,formd,files){
                        // console.log(err);
                        // console.log(formd);
                        // console.log(files);
                        fd.uploadDir = "D:\Temp";
                        var imgpath = './public/img/'+files.img.name; 
                        fs.rename(files.img.path,imgpath,function(err){
                            if(!err){
                                formd.img = imgpath;
                                controller.editUser(req,res,u.query.id,formd)
                            }
                        });
                    })
                }

            } else {

            }
        })
    }
}