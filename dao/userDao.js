import mysql from 'mysql';
import $conf from '../conf/db';
import $util from '../util/util';
import $userSql from './userSqlMapping';
import {
    ID,
    REPEATNAME
} from '../util/constUtil.js'

//使用连接池
let pool = mysql.createPool($util.extend({},$conf.mysql));

function jsonWrite(res,ret){
    if (typeof ret === 'undefined') {
        res.json({
            code:0,
            msg:'failed'
        });
    } else {
        res.json(ret);
    }
}

function toJson(str){
    return eval(JSON.stringify(str))
}

function regSuccess(userName,userId,userHead,userNickname){
    return regSuccess = {
        code:200,
        msg:'success',
        data:{
            userMsg:{
               userName:userName,
               userId:userId,
               userHead:userHead,
               userNickname:userNickname,
           }
        }
    }
}


class User{
    constructor(){

    }

    /**
        注册用户
    **/
    register(req,res){
        pool.getConnection(
            (err,connection)=>{
                let param = req.body;
                console.log('register',param)
                //首先判断用户名是否重复
                connection.query(
                    $userSql.queryByName,
                    param.userName,
                    (err,result)=>{
                        console.log("queryByName",err,result);
                        if (result.length == 0) {
                            // 不重复的情况下查询用户表中的最大pk，然后+1组合为userId
                            connection.query(
                                $userSql.queryLastPk,
                                (err,result)=>{
                                    console.log("queryLastPk",err,result);
                                    if (result) {
                                        result = toJson(result);
                                        let num = result[0].pk + 1;
                                        let userId = ID + num;
                                        //生成id后插入到用户表中
                                        connection.query(
                                            $userSql.insert,
                                            [
                                                userId,  //用户id
                                                param.userName, //用户名
                                                param.password, //用户密码
                                                false, //删除状态
                                                new Date().toLocaleString(), //当前时间
                                                param.userName //用户昵称
                                            ],
                                            (err,result)=>{
                                                console.log("insert",err,result);
                                                if (result) {
                                                    jsonWrite(res,regSuccess(param.userName,userId,"",param.userName));
                                                } else {
                                                    //插入表失败
                                                    console.log("user---插入表失败")
                                                    jsonWrite(res,result);
                                                }
                                            }
                                        )
                                    } else {
                                        // 获取pk失败
                                        console.log("user---获取pk失败")
                                        jsonWrite(res,result)
                                    }
                                }
                            )
                        } else {
                            //用户名重复
                            console.log("user---用户名重复")
                            jsonWrite(res,REPEATNAME);
                        }
                    }
                )
            }
        )
    }

    /**
        显示全部用户
    **/
    showAll(req,res){
        pool.getConnection(
            (err,connection)=>{

            }
        )
    }

}

export default User
