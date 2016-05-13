var db = require('./db');
function personal_del(JSON)
{
	this.json = JSON;
}
personal_del.prototype.personal=function(req,res,callback)
{
	var json = this,json;
	db.conn(conn_del);
	function conn_del(err,db)
	{
		if(err)
		{
			console.log('personal_del:数据库连接错误');
		}
		else
		{
			console.log('personal_del:成功建立数据库连接');
			db.collection('personal',col_del,{safe:true});
			function col_del(err,col)
			{
				if(err)
				{
					console.log('personal_del:选择表失败');
				}
				else
				{
					col.findOne({'userId':json.userId},findOne_del);
					function findOne_del(err,doc)
					{
						if(!doc)
						{
							col.insert(json,{safe:true},insert_del);
							function insert_del(err,result)
							{
								if(err)
								{
									console.log('personal_del:数据插入失败');
								}
								else
								{
									console.log('personal_del:数据插入成功');
									callback(1,{});
								}
							}
						}
						else
						{
							col.update({'userId':json.userId},{'$set':json},{safe:true},update_del);
							function update_del(err,result)
							{
								if(err)
								{
									console.log('personal_del：更新失败');
								}
								else
								{
									console.log('personal_del:更新成功'+result);
									callback(1,{});
								}
							}
						}
					}					
				}
			}
		}
	}
}
module.exports=personal_del;