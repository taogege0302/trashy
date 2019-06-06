//加载fs模块
 var fs = require('fs');

//导入model模块
var model = require('./model.js');
//加载art-template模块,模板引擎
var template = require('art-template');
module.exports = {
    cont : function(req,res){
        model.select(function(datas){
            var html = template(__dirname + '/view/index.html', {data:datas});
            res.end(html);

        });       
    },

    gets : function(id,req,res){
        model.where(id).select(function(data){
            var html = template(__dirname + '/view/user.html', {data:data});
            res.end(html);
        });
    },
    del : function(id,req,res){
        model.where(id).del(function(data){
           if(data.affectedRows >= 1){
                var str = "<script>alert('删除成功!');location.href = '/'</script>";
                res.setHeader('Content-type','text/html;charset=utf-8');
                res.end(str);
           }
        });
    },
    edit : function(id,req,res){
        model.where(id).select(function(data){
            var html = template(__dirname + '/view/edit.html', {data:data});
            res.end(html);
        });
    },
    edit_post: function(id,res,data){
        model.where(id).update(data,function(datas){
            if(datas.affectedRows >= 1){
                var str = "<script>alert('修改成功!');location.href = '/'</script>";
                res.setHeader('Content-type','text/html;charset=utf-8');
                res.end(str);
           }
        })
    },
    add : function(req,res){
        fs.readFile(__dirname + '/view/add.html',function(err,data){
            res.end(data);
        });
    },
    add_post : function(req,res,data){
        model.add(data,function(datas){
            if(datas.affectedRows >= 1){
                var str = "<script>alert('添加成功!');location.href = '/'</script>";
                res.setHeader('Content-type','text/html;charset=utf-8');
                res.end(str);
           }
        })
    }
};
