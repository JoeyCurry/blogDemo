var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./userSqlMapping');

//使用连接池
var pool = mysql.createPool($util.extend({},$conf.mysql));

//向前台返回JSON方法的简单封装
var jsonWrite = function(res,ret){
    if (typeof ret === 'undefined') {
        res.json({
            code:'0',
            msg:'failed'
        });
    } else {
        res.json(ret);
    }
};



module.exports = {
    //注册用户，向user表中添加数据
    add: function (req,res,next){
        pool.getConnection(function(err,connection){
            //获取前台参数
            var param = req.query || req.params;
            var user_id;
            //根据pk生成user_id
            //'select max(pk) from user'
            connection.query($sql.queryLastPk,function(err,result){
                if (result) {
                    result = eval(JSON.stringify(result));
                    user_id = "USER0000" + result[0].pk;
                    console.log('user_id',user_id);
                    console.log('time',new Date().toLocaleString());
                    //建立连接，向表中插入值
                    //insert:'INSERT INTO user(user_id, user_name, password,
                    //deleted,register_time) VALUES (?,?,?,?,?)',
                    connection.query(
                        $sql.insert,
                        [user_id,param.name,param.password,false,new Date().toLocaleString()],
                        function(err,result){
                            console.log('err',err);
                            console.log('result',result);
                            if (result) {
                                result = {
                                    code:200,
                                    msg:'注册成功'
                                };
                            }
                            console.log("result",result);
                            jsonWrite(res,result);
                            connection.release();
                        }
                    );
                }

            });




        });
    }
};
