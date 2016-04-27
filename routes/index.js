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
		res.render('index');
});


router.post('/:key', function(req, res, next) //reg.html页面路由
{
<<<<<<< HEAD
	var action = req.params.key;				//验证提交的是登录请求还是注册请求
=======

	var action = req.params.key;				//验证提交的是登录请求还是注册请求
		console.log('action:'+action)
>>>>>>> 13c988aba771aa17e1e5a34dc7a5ef9952cf38f6
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
<<<<<<< HEAD
		var regDel = new reg_del(json);				//执行注册操作
		regDel.reg(req,res,regCallback);
		function regCallback(status,data)
		{
			if(status)
			res.render('index');
			else
			res.render('index'); 
		}
	}
	else								//执行登录操作
	{
=======
		console.log(json)
		var regDel = new reg_del(json);				//执行注册操作
		regDel.reg(req,res,callbackReg);
		function callbackReg(status,data)
		{
			res.render('index')
			console.log('zhelizheefregrfsrgf')
		}
	}
	if(action=='login')								//执行登录操作
	{

>>>>>>> 13c988aba771aa17e1e5a34dc7a5ef9952cf38f6
		var json = {
			'userId'	: 	req.body.userId,
			'passWord'	: 	req.body.passWord
		}
<<<<<<< HEAD
		var loginDel = new login_del(json);
		loginDel.login(req,res,loginCallback);
		function loginCallback(status,data)
		{
=======
		console.log(json);
		var loginDel = new login_del(json);
		loginDel.login(req,res,callbackLogin);
		console.log(11);
		function callbackLogin(status,data)
		{
			console.log(data);
>>>>>>> 13c988aba771aa17e1e5a34dc7a5ef9952cf38f6
			if(status)
				res.redirect('/hotel');
			else
				res.render('index');  
		}
<<<<<<< HEAD
	}
=======
	}  
>>>>>>> 13c988aba771aa17e1e5a34dc7a5ef9952cf38f6
});

router.get('/hotel',function(req,res,next)
{
	var json = {};
	var hotelDel = new hotel_del(json);
	hotelDel.hotel(req,res,callback);
	function callback(status,data)
	{
		res.render('hotel',{'data':data});
	}
})

/*******************************************************************************/

module.exports = router;
