var express = require('express');
var user_del = require('../modles/user_del');
var publish_del = require('../modles/publish_del');
var update_read_del  = require('../modles/update_read_del');
var update_write_del  = require('../modles/update_write_del');
var personal_del  = require('../modles/personal_del');
var personal_display_del  = require('../modles/personal_display_del');
var router = express.Router();

/* GET users listing. */
router.get('/:userId',function(req,res,next)
{
	var json = {'userId':req.params.userId};
	var personalDisplayDel = new personal_display_del(json);
	personalDisplayDel.personal_display(req,res,callback);
	function callback(status,data)
	{
		console.log(data)
		res.render('page/personal',{'edit':0,'data':data});		
	}

})

router.get('/:key/edit',function(req,res,next)
{
	var json = {'userId':req.params.userId};
	var personalDisplayDel = new personal_display_del(json);
	personalDisplayDel.personal_display(req,res,callback);
	function callback(status,data)
	{
		console.log(data)
		res.render('page/personal',{'edit':1,'data':data});		
	}

})
router.post('/:key/edit',function(req,res,next)
{
	var json = req.body;
	json.userId = req.cookies.userId;
	var personalDel = new personal_del(json);
	personalDel.personal(req,res,callback);
	function callback(status,data)
	{
		if(status)
		{
			res.redirect('/personal/'+req.cookies.userId);
		}
	}
})
// router.get('/:key', function(req, res, next) 
// {

//   var json = {'userId':req.params.key};
//   var userDel = new user_del(json);
//   userDel = userDel.user(req,res,callback);
//   function callback(status,data)
//   {
//   	res.render('personal',{'data':data});
//   	res.redirect('/personal/blog/'+data.userId+'/'+data.blog[i].blogId)
//   }


//	});

router.get('/blog/publish',function(req,res,next)
{
	if(!req.cookies.userId)
		res.redirect('/');
	else
		res.render('page/publish',{'update':0});
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
				res.render('page/publish',{'data':data,'update':1});
			}
		}
})

router.post('/blog/publish',function(req,res,next)
{
	var blogId = new Date().getTime();
	var json = {
					'blogId'		: 	blogId,
					'blogAuthorName': 	req.cookies.userName,
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
			res.redirect('/personal/blog/'+req.cookies.userId+'/'+blogId);
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
			res.redirect('/personal/blog/'+req.cookies.userId+'/'+req.params.blogId);
		}
	}

})


module.exports = router;
