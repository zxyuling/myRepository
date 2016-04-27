var db = require('./db');
function user_del(JSON)
{
	this.json = JSON;
}


user_del.prototype.user=function(req,res,callback)
{
	var data={'blogNum':0};//用于储存查找到的blog数据
	var json=this.json;//获取必要数据
	
	db.conn(con_del);//建立数据库连接
	function con_del(err,db)
	{
		if(err)
		{
			console.log('user_del:数据库连接失败');
			throw err;
		}
		db.collection('user',col_del,{safe:true});//选择表user 为了读取blog的记录条数
		function col_del(err,col)
		{
			if(err)
			{
				console.log('user_del:选择表失败');
				throw err;
			}
			col.findOne({'userId':json.userId},findOne_del);//查找用户相关数据
			function findOne_del(err,doc)
			{
				if(err)
				{
					console.log("user_del:查找失败");
					throw err;
				}
				data.userId = doc.userId;
				data.display = doc.display;
				if(doc.blogNum)//如果blog有条目存在，把数据存入date中,并查找blog表
				{
					data.blogNum = doc.blogNum;
					db.collection('blog',col_del,{safe:true}) //查找blog表
					function col_del(err,col)
					{
						if(err)
						{
							console.log('user_del:查询blog表出错');
							throw err;
						}
						else
						{
							db
							col.find({'blogAuthorId':json.userId}).toArray(find_del); //在blog表中查找是userId写的blog数据
							function find_del(err,doc)
							{
								if(err)
								{
									console.log('user_del:查找blog表示失败');
									throw err;
								}
								else
								{
									data.blog = doc;
									callback(true,data);
								}
							}
						}
					}
				}
				else
				callback(false,data);
			}
		}
	}
}
module.exports=user_del;
