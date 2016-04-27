var express = require('express');
var blogContent_del = require('../modles/blogContent_del');
var commentary_del = require('../modles/commentary_del');
var router = express.Router();

/* GET home page. */
router.get('/:userId/:blogId', function(req, res, next) //根目录路由
{
	var json = {
				'blogAuthorId'	: 	req.params.userId,
<<<<<<< HEAD
				'blogId'	: 	req.params.blogId
=======
				'blogId'		: 	req.params.blogId
>>>>>>> 13c988aba771aa17e1e5a34dc7a5ef9952cf38f6
	}

	var blogContentDel = new blogContent_del(json);
	blogContentDel.blogContent(req,res,callback);
	function callback(status,data)
	{
		console.log(data);
		res.render('blogs',{'data':data});

	}
});

router.post('/:blogAuthorId/:blogId',function(req,res,next)
{
	var commentaryId = new Date().getTime();
	var json = {
				'blogAuthorId'			: 	req.params.blogAuthorId,
				'blogId'				: 	req.params.blogId,
				'commentaryId'			: 	commentaryId,
				'commentaryAuthorId'	: 	req.cookies.userId,
				'commentaryAuthorName'	: 	req.cookies.userName,
				'commentaryContent'		: 	req.body.commentaryContent 	
	}
	var commentaryDel = new commentary_del(json);
	commentaryDel.commentary(req,res,callback);
	function callback(status,data)
	{
		res.redirect('/personal/blog/'+req.params.blogAuthorId+'/'+req.params.blogId);
	}
})

module.exports = router;
