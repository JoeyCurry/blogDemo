import mysql from 'mysql';
import $conf from '../conf/db';
import $util from '../util/util';
import $sql from './userSqlMapping';
//使用连接池
let pool = mysql.createPool($util.extend({},$conf.mysql));

//向前台返回JSON方法的简单封装
var jsonWrite = function(res,ret){
    if (typeof ret === 'undefined') {
        res.json({
            code:0,
            msg:'failed'
        });
    } else {
        res.json(ret);
    }
};

// function getUserInfo(connection,user_id){
//     connection.query($sql.queryById,[user_id],function(err,result){
//         console.log('err',err);
//         console.log('result',result);
//         if (result) {
//             result = {
//                 code:200,
//                 msg:'success',
//                 data:{
//                     userMsg:{
//                         userName:param.userName,
//                         userId:user_id
//                     }
//                 }
//             }
//         }
//     })
// }

module.exports = {
    //注册用户，向user表中添加数据
    add: function (req,res,next){
        pool.getConnection(function(err,connection){
            //获取前台参数
            var param = req.body;
            console.log("register",param);
            connection.query($sql.queryByName,param.userName,function(err,result){
                console.log(result);
                if (true) {

                }
            })
            var user_id;
            //根据pk生成user_id
            //'select max(pk) from user'
            connection.query($sql.queryLastPk,function(err,result){
                console.log(result);
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
                        [user_id,param.userName,param.password,false,new Date().toLocaleString(),param.userName],
                        function(err,result){
                            console.log('err',err);
                            console.log('result',result);
                            if (result) {
                                //获取用户信息回传给前端
                                connection.query($sql.queryById,[user_id],function(err,result){
                                    console.log('idresult',result);
                                    let user_data = eval(JSON.stringify(result));
                                    console.log('user_data',user_data);
                                    result = {
                                       code:200,
                                       msg:'success',
                                       data:{
                                           userMsg:{
                                               userName:user_data[0].user_name,
                                               userId:user_data[0].user_id,
                                               userHead:user_data[0].user_head,
                                               userNickname:user_data[0].nickname,
                                                }
                                            }
                                        };
                                    }
                                );
                            }
                            // console.log("result",result);
                            // jsonWrite(res,result);
                             connection.release();
                        }
                    );

                }

            });
        });
    },
    //显示所有用户
    showAll:function(req,res,next){
        pool.getConnection(function(err,connection){
            //建立连接'select * from user'
          connection.query($sql.queryAll,function(err,result){
            if (result) {
                console.log(result);
                var result_json ={
                    code:200,
                    msg:result
                }
                jsonWrite(res,result_json);
                connection.release();
              }
            })
        })
    },



};
