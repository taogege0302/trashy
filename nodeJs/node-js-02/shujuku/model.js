//连接数据,首先加载mysql模块
var mysql = require('mysql');
//创建mysql服务,填写参数
var conn = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'nodejs'
});
//连接数据库
conn.connect();

module.exports = {
    whes:'',
    where : function(wheres){
        this.whes = wheres;
        return this;
    },
    select : function(callback){
        // console.log(this.whes)
        if(this.whes != ''){
            var sql = 'select * from users where id='+ this.whes; 
            this.whes = '';
        }else{
            var sql = 'select * from users'; 
        }
        conn.query(sql, function (err, data) {
            if(err){
                console.log(this.whes)
                console.log(err);
            } else {
                callback(data);
            }          
        });
    },
    del : function(callback){
        if(this.whes != ''){
            var sql = 'delete from users where id='+ this.whes; 
            this.whes = '';
        }else{
            console.log('对不起,删不了'); 
        }
        conn.query(sql, function (err, data) { 
            callback(data);
        });
    },
    update : function(data,callback){
        var str = '';
        for(key in data){
            str += key + '=' + '\'' + data[key] + '\'' + ',';
        }
        var str = str.slice(0,str.length-1);
        if(this.whes != ''){
            var sql = 'update users set ' + str + ' where id=' + this.whes; 
            this.whes = '';
        }else{
            console.log('对不起,改不了');
        }      
        conn.query(sql, function (err, data) { 
            callback(data);
        });
    },
    add : function(data,callback){
        var key = '';
        var val = '';
        for(ke in data){
            key += ke + ',';
            val += '\'' + data[ke] + '\'' + ',';
        }
        var key = key.slice(0,key.length-1);
        var val = val.slice(0,val.length-1);
        var sql = 'insert into users ' + '(' + key + ') values ' + '(' + val + ')'; 
        conn.query(sql, function (err, data) { 
            callback(data);
        });
    }
}

