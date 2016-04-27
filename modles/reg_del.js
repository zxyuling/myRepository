 var db=require('./db');
function reg_del(JSON)
{
	this.json=JSON;//表单获取的数据
}

reg_del.prototype.reg=function(req,res,callback)
{
	var json=this.json;
	console.log("数据已获取："+json.userName);
	db.conn(con_del);
	function con_del(err,db)
	{		
		if(err)
		{
			console.log('reg_del:建立连接失败');
			throw err;
		}
		console.log('reg_del:成功建立连接,即将进行注册操作');//在这里执行数据库的操作
		db.collection('user',col_del,{safe:true});//选择数据库集合（相当于sql数据库中的表）：user
		function col_del(err,col)
		{
			if(err)
			{
				console.log('reg_del:user--集合选择失败');
				throw err;
			}
			console.log('reg_del:user--集合选择成功,准备插入注册数据');
			col.findOne({'userId':json.userId},findOne_del);//查询数据库中的某对键值，查询结果在回调函数中的doc中
			function findOne_del(err,doc)
			{
			 	if(err)
			 	{
			 		console.log('reg_del:Id查询失败');
			 		throw err;
			 	}
			 	if(doc)//如果查询有结果，跳转到原页面
			 	{
			 		console.log('reg_del:用户存在');
			 		callback(false,{});
			 	}
			 	else//查询无结果就插入冲表单中获取的数据
			 	{
					console.log('reg_del:插入数据');
		 			col.insert(json,{safe:true},insert_del);//插入数据，json格式
					function insert_del(err,result)
					{
						if(err)
						{
							console.log('reg_del:插入失败');
							throw err;
						}
						console.log('reg_del:插入成功，结果：'+result);
						callback(true,{});
					}
		 		}
			}					
		}
	}
}

module.exports = reg_del;