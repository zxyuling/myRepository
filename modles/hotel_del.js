var db = require('./db');

function hotel_del(JSON)
{
	this.json = JSON;
}

hotel_del.prototype.hotel = function(req,res,callback)
{
	//var json = this.json; // 获取必须数据
	if(!req.cookies.userId) //如果未登录，直接反回
	{
		callback(false,{});
		return;
	}
	else
	{
		db.conn(con_del); //连接数据库
		 function con_del(err,db)
		{
			if(err)
			{
				console.log('hotel_del:数据库连接失败');
				throw err;
			}
			db.collection('user',col_del,{safe:true})//查找用户表
			function col_del(err,col)
			{
				if(err)
				{
					console.log('hotel_del:查找表失败');
					throw err;
				}
				else
				{
					col.findOne({'userId':req.cookies.userId},findOne_del);//查找当前用户数据
					function findOne_del(err,doc)
					{
						callback(true,doc);
					}
				}
			}
		}
	}
}
module.exports = hotel_del;