/**
 *     /:主页
 *     /reg:注册
 *     /login:登录
 *     /post:发表
 */
// var userDao = require('../dao/userDao');
import User from '../dao/userDao.js'

let user = new User();
module.exports = function(app){
    app.get('/',function(req,res){
        userDao.showAll(req,res);

        //res.render('index',{title:'主页'});
    });

    app.post('/register',function(req,res){
        user.register(req,res);
    });

    app.get('/register',function(req,res){
        //.add(req,res)
        //res.render('index',{title:'注册'});
        console.log(req,res);
    });

    // app.post('/reg',function(req,res){
    // });

    app.get('/login',function(req,res){
        res.render('index',{title:'登录'});
    });

    app.post('/login',function(req,res){

    });

    app.get('/post',function(req,res){
        res.render('index',{title:'发表'});
    });

    app.post('/post',function(req,res){
    });

    app.get('/logout',function(req,res){
    });

};
