var db = require('./modles/db');

	var json={blogId:1448971814426,blogTitle:'req.body.blogTitle',blogContent:'req.body.blogContent'};
	db.conn(con_del);
	function con_del(err,db)
	{
		db.collection('user',col_del,{safe:true});
		function col_del(err,col)
		{
			console.log('开始修改'+json.blogId);
			// 
			col.update({"blog.blogId":json.blogId},{$set:{"blog.$.blogTitle":json.blogTitle,"blog.$.blogContent":json.blogContent}},{safe:true},result);
			function result(err,doc)
			{
				if(err)
					throw err;
				else
					console.log(doc);
			}

		}

	}
