var express = require('express');
var reg_del = require('../modles/reg_del');
var login_del = require('../modles/login_del');
var hotel_del = require('../modles/hotel_del')
var set_del = require('../modles/set_del');
var logout_del = require('../modles/logout_del');
var publish_del=require('../modles/publish_del');
var blogDate = require('../modles/user_del');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) //根目录路由
{
	if(req.cookies.userId)
		res.redirect('/hotel');
	else
		res.render('page/index');
});


router.post('/:key', function(req, res, next) //reg.html页面路由
{
	var action = req.params.key;				//验证提交的是登录请求还是注册请求
	if(action=='reg')
	{
		var json = {
			'userId'	: 	req.body.userId,
			'userName'	: 	req.body.userName,
			'passWord'	: 	req.body.passWord,
			'sex'		: 	req.body.sex,
			'age' 		: 	req.body.age,
			'describe'	: 	req.body.describe,
			'display'	: 	req.body.display
		}
		var regDel = new reg_del(json);				//执行注册操作
		regDel.reg(req,res,regCallback);
		function regCallback(status,data)
		{
			if(status)
			res.render('page/index');
			else
			res.render('page/index'); 
		}
	}
	else								//执行登录操作
	{
		var json = {
			'userId'	: 	req.body.userId,
			'passWord'	: 	req.body.passWord
		}
		var loginDel = new login_del(json);
		loginDel.login(req,res,loginCallback);
		function loginCallback(status,data)
		{
			if(status)
				res.redirect('/hotel');
			else
				res.render('page/index');  
		}
	}
});

router.get('/hotel',function(req,res,next)
{
	var json = {};
	var hotelDel = new hotel_del(json);
	hotelDel.hotel(req,res,callback);
	function callback(status,data)
	{
		res.render('page/hotel',{'data':data});
	}
});

/*******************************************************************************/
router.get('/logout',function(req,res,next)
{
	var logoutDel = new logout_del({});
	logoutDel.logout(req,res,callback);
	function callback(status,data)
	{
		res.redirect('/');
	}
});
module.exports = router;
