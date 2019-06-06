var mysql = require('mysql');
var conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'nodejs'
})

conn.connect();

module.exports = {
    cha: function (c) {
        conn.query('select * from users', function (err, sqlbackdata) {
            // console.log(sqlbackdata)
           c(sqlbackdata);
        })
    },

    getone:function(id,callbackFun){
        conn.query('select * from users where id='+id,function(err,sqldata){
            callbackFun(sqldata);
        })
    },

    wh:'',
    where:function(wheres){
        // 接到传入的where条件的值，将值保存到对象的属性(wh)中
        this.wh = wheres;
        // 为了保证继续调用select方法，需要将本对象返回
        return this;
    },

    // 链式操作  model对象再一次调用select方式时，就可以在方法中获取本对象已经保存下来的wh的值
    // 拼装到sql中  从而实现链式操作
    select:function(callbackFun){
        // 调用时先进行判断，
        // 判断where方法有没有被调用过（依据就是wh属性有没有值）
        // 有值就是被调用过，那么我们在拼装sql语句时需要拼接where条件 反之不拼接  
        if(this.wh != ''){
            var sql = 'select * from users where '+this.wh;
            // 如果wh有值那么拼接完sql语句后要将wh的值清空，
            // 否则会影响到下一次的查询
            this.wh = '';
        }else{
            var sql = 'select * from users '
        }
        conn.query(sql,function(err,sqldata){
            callbackFun(sqldata);
        })
    },
    del:function(callbackFun,id){
        if(this.wh != ''){
            var sql = 'delete from users where '+this.wh;
            this.wh = '';
            conn.query(sql,function(err,sqldata){
                callbackFun(sqldata);
            })
        }else{
            console.log('想死吗,兄弟!');
        }
    }
}



