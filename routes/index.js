/**
 *     /:主页
 *     /reg:注册
 *     /login:登录
 *     /post:发表
 */
var userDao = require('../dao/userDao');

module.exports = function(app){
    app.get('/',function(req,res){
        userDao.add(req,res);
        
        //res.render('index',{title:'主页'});
    });

    app.get('/reg',function(req,res){
        res.render('index',{title:'注册'});
    });

    app.post('/reg',function(req,res){
    });

    app.get('/login',function(req,res){
        res.render('index',{title:'登录'});
    });

    app.post('/login',function(req,res){

    });

    app.get('/post',function(req,res){
        res.render('post',{title:'发表'});
    });

    app.post('/post',function(req,res){
    });

    app.get('/logout',function(req,res){
    });

};
