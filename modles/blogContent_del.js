var db = require('./db');
function blogContent_del(JSON)
{
	this.json = JSON;
}


blogContent_del.prototype.blogContent=function(req,res,callback)
{
	var data = {'commentaryNum':0};//用于储存查找到的blog数据
	var json = this.json;//获取必要数据
	db.conn(con_del);//建立数据库连接
	function con_del(err,db)
	{
		if(err)
		{
			console.log('blogContent:数据库连接失败');
			throw err;
		}
		db.collection('blog',col_del,{safe:true});//选择表blog
		function col_del(err,col)
		{
			if(err)
			{
				console.log('blogContent:选择表失败');
				throw err;
			}
			col.findOne({'blogAuthorId':json.blogAuthorId,'blogId':parseInt(json.blogId)},findOne_del);//查找用户相关数据
			function findOne_del(err,doc)
			{
				if(err)
				{
					console.log("blogContent:查找失败");
					throw err;
				}
				data.blogId = json.blogId;
				data.blogAuthorId = json.blogAuthorId;
				data.blogAuthorName = doc.blogAuthorName;
				data.blogContent = doc.blogContent;
				data.blogTitle = doc.blogTitle;
				if(doc.commentaryNum)
				{
					data.commentaryNum = doc.commentaryNum;
					db.collection('commentary',col_del,{safe:true});
					function col_del(err,col)
					{
						col.find({'userId':json.userId,'blogId':json.blogId}).toArray(find_del);
						function find_del(err,doc)
						{
							data.commentary = doc;
							callback(true,data);
						}
					}
				}
				else
					callback(false,data);
			}
		}
	}
}
module.exports=blogContent_del;
