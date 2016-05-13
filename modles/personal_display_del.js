var db = require('./db');
function personal_display_del(JSON)
{
	this.json = JSON;
}
personal_display_del.prototype.personal_display=function(req,res,callback)
{
	var json = this,json;
	db.conn(conn_del);
	function conn_del(err,db)
	{
		if(err)
		{
			console.log('personal_display_del：数据库连接失败');
			throw err;
		}
		console.log('personal_display_del:数据库连接成功');
		db.collection('personal',col_del,{safe:true});//选择表blog
		function col_del(err,col)
		{
			col.findOne({'userId':json.userId},findOne_del);
			function findOne_del(err,doc)
			{
				if(err)
				{
					console.log('personal_display_del:查找失败');
				}
				if(doc)
				{
					callback(1,doc);
				}
				else
				{
					console.log('personal_display_del：没有数据');
				}
			}
		}
	}
}
module.exports=personal_display_del;