var db = require('./db');
function publish_del(JSON)
{
	this.json=JSON;
}

publish_del.prototype.publish=function(req,res,callback)
{
	var json = this.json;//获取必须数据
	var data={};
	db.conn(con_del);//连接数据库
	function con_del(err,db)
	{
		if(err)
		{
			console.log('publish_del：数据库连接失败');
			throw err;
		}
		console.log('publish_del:数据库连接成功');
		db.collection('blog',col_del,{safe:true});//选择表blog
		function col_del(err,col)
		{
			if(err)
			{
				console.log('publish_del:选择表失败');
				throw err;
			}
			console.log('publish_del:成功选择表');
			col.insert(json,{safe:true},insert_del);
			function insert_del(err,result)
			{
				if(err)
				{
					console.log('publish_del：插入blog失败');
					throw err;
				}
				console.log('publish_del:插入结果'+result);
				db.collection('user',col_del_user,{safe:true});
				function col_del_user(err,col)
				{
					col.update({'userId':json.blogAuthorId},{$inc:{'blogNum':1}},{safe:true},update_del);
					function update_del(err,result)
					{
						if(err)
						{
							console.log('publish_del:更新blognum失败');
							throw err;
						}
						console.log('publish_del:更新成功：'+result);
						callback(true,result);
					}			
				}
			}
		}
	}
}
module.exports=publish_del;