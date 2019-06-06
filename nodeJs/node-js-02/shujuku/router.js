var fs = require('fs');
 //导入controller模块,处理相关业务
var controller = require('./controller.js');
//router模块,用于时间监听并处理
module.exports = {
    start : function(server){
        server.on('request',function(req,res){
            var urls = req.url;
             //加载url模块,
             var url_ = require('url');
             //解析请求路径
             var url = url_.parse(req.url,true);
             //判断请求方法
            if(req.method == 'GET'){
                if(url.pathname == '/'){
                    //调用控制器cont方法,并传入请求对象和响应对象
                    controller.cont(req,res);
                }else if(url.pathname == '/showO'){   
                    //调用控制器gets方法,并传id,及返回数据页面方法
                    controller.gets(url.query.id,req,res);
                }else if(url.pathname == '/del'){
                    controller.del(url.query.id,req,res);
                }else if(url.pathname == '/edit'){
                    controller.edit(url.query.id,req,res);
                }else if(url.pathname == '/add'){
                    controller.add(req,res);
                }else{
                    fs.readFile('.' + urls,function(err,data){
                        res.end(data);
                    });
                }
            }else if(req.method == 'POST'){
                var formidable = require('formidable');
                var fm = new formidable.IncomingForm();
                fm.uploadDir = "./";
                fm.parse(req, function(err, fields, files) {                 

                    var imgpath = './public/img/' + files.img.name;
                    fs.rename(files.img.path, imgpath, function(err){
                        if(err){
                            console.log(err);
                        }         
                        if (!err){
                            fields.img = imgpath;
                            if(url.pathname == '/edit'){
                                controller.edit_post(url.query.id,res,fields);
                            }else if(url.pathname == '/add'){
                                controller.add_post(req,res,fields);
                            }
                        }                       
                    });
                });

                // var data = '';
                // req.on('data',function(us){
                //     data += us;
                // });  
                // req.on('end',function(){
                //     var post_data = require('querystring').parse(data);
                //     if(url.pathname == '/edit'){
                //         controller.edit_post(url.query.id,res,post_data);
                //     }else if(url.pathname == '/add'){
                //         controller.add_post(req,res,post_data);
                //     }
                // });
                
            }else{

            }
        });
    }
}