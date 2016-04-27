var express = require('express');
var user_del = require('../modles/user_del');
var publish_del = require('../modles/publish_del');
var update_read_del  = require('../modles/update_read_del');
var update_write_del  = require('../modles/update_write_del');
var router = express.Router();

/* GET users listing. */
router.get('/:key', function(req, res, next) 
{

  var json = {'userId':req.params.key};
  var userDel = new user_del(json);
  userDel = userDel.user(req,res,callback);
  function callback(status,data)
  {
  	res.render('personal',{'data':data});
  	console.log(data)
  }


});

router.get('/:key/publish',function(req,res,next)
{
	if(!req.cookies.userId)
		res.redirect('/');
	else
		res.render('publish');
})

router.get('/:key/update/:blogId',function(req,res,next)
{
	if(!req.cookies.userId)
		res.redirect('/');
	else
		{
			var json = {'blogAuthorId':req.params.key,'blogId':req.params.blogId};
			var updateReadDel = new update_read_del(json);
			updateReadDel.read(req,res,callback);
			function callback(status,data)
			{
				//console.log('huidiaohans')
				res.render('update',{'data':data});
			}
		}
})

router.post('/:key/publish',function(req,res,next)
{
	var blogId = new Date().getTime();
	var json = {
					'blogId'		: 	blogId,
					'blogAuthorId'	: 	req.cookies.userId,
					'blogTitle'		: 	req.body.blogTitle,
					'blogType'		: 	req.body.blogType,
					'blogContent'	: 	req.body.blogContent			
	}
	var publishDel = new publish_del(json);
	publishDel.publish(req,res,callback);
	function callback(status,data)
	{
		if(status)
		{
			res.redirect('/personal/'+req.cookies.userId);
		}
	}

})

router.post('/:key/update/:blogId',function(req,res,next)
{
	var json = {
					'blogId'		: 	parseInt(req.params.blogId),
					'blogAuthorId'	: 	req.cookies.userId,
					'blogTitle'		: 	req.body.blogTitle,
					'blogType'		: 	req.body.blogType,
					'blogContent'	: 	req.body.blogContent			
	}
	var updateWriteDel = new update_write_del(json);
	updateWriteDel.write(req,res,callback);
	function callback(status,data)
	{
		if(status)
		{
			res.redirect('/personal/'+req.cookies.userId);
		}
	}

})
module.exports = router;
