var mysql = require('mysql');
var conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'nodejs'
})

conn.connect();

module.exports = {

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


    del:function(callbackFun){
        // 删除必须有where条件
        // 判断没有where条件，是不会发送任何sql语句，会立即停止执行并给出提示
        if(this.wh != ''){
            var sql = 'delete from users where '+this.wh;
            this.wh = ''; // sql语句组装完成后 清空wh条件
            conn.query(sql,function(err,sqldata){
                callbackFun(sqldata);
            })
        }else{
            console.log('赶紧跑路')
        }
    },



    up:function(data,callbackFun){
        // 判断有没有调用where
        if(this.wh != ''){
            // 通过循环遍历拼装成set部分的sql语句
            var s = ''
            for(v in data){
                s += v + '="'+data[v]+'",';
            }
            // name=ss,nengli=ss,
            s = s.slice(0,s.length-1)
            // console.log(s);
            // update users set name="asdf",nengli='123' where id=2;
            // 将set部分与整个sql 进行拼接
            var sql = ' update `users` set '+s+'  where '+this.wh;
            this.wh = '';
            // 发送sql语句并将值返回
            conn.query(sql,function(err,sqldata){
                callbackFun(sqldata)
            })

        }else{
            // 如果修改没有调用where方法，直接不组装sql
            console.log('赶紧跑路')
        }


    },


    // 添加操作
    save:function(data,callbackFun){
        // 将传入的data对象数据拼接为 目标sql
        // insert into `users` (name,nengli) values ('lisi','choiniu')


        var keys = ''; // 字段名
        var values = ''; //value值
        
        // 通过for in 进行循环遍历拼接
        for(v in data){
            keys += v+',';
            values += "'"+data[v]+"',"
        }
        // keys.slice(0,keys.length-1)
        // console.log(keys.slice(0,keys.length-1))
        // console.log(values.slice(0,values.length-1));
        keys = keys.slice(0,keys.length-1);
        values = values.slice(0,values.length-1);

        // 将拼接好的字段名和value数据 拼接到sql语句中
        var sql = "insert into `users` ("+keys+") values("+values+")";
        // console.log(sql);
        // 发送sql语句
        conn.query(sql,function(err,sqlback){
            // console.log(sqlback);
            callbackFun(sqlback);
        })
    }
}



