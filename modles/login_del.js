var db = require('./db');
function login_del(JSON)
{
	this.json = JSON;
}
login_del.prototype.login=function(req,res,callback)
{
	var json=this.json;//获取登录必要数据
	console.log('login_del:已获取数据:'+json);
	db.conn(con_del); //建立数据库连接
	function con_del(err,db)
	{
		if(err)
		{
			console.log('login_del:建立连接失败');
			throw err;
		}
		console.log('login_del:成功建立连接');
		db.collection('user',col_del,{safe:true}) //选择表user
		function col_del(err,col)
		{
			if(err)
			{
				console.log('login_del:选择表失败');
				throw err;
			}
			else
			{
				console.log('login_del:成功选择文档');
				col.findOne({'userId':json.userId,'passWord':json.passWord},findOne_del);//查找数据库，id和密码是否匹配
				function findOne_del(err,doc)
				{
					if(err)
					{
						console.log('login_del:Id查询失败');
						throw err;
					}
					else
					{
						if(doc)//匹配成功设置cookie
						{
							console.log('login_del:登录成功');
							res.cookie('userId', doc.userId);//设置cookie
							res.cookie('userName',doc.userName);
							res.cookie('password',doc.passWord);
							callback(true,{});
						}
						else
						{
							console.log('login_del:登录失败');
							callback(false,{});
						}
					}
				}
			}
		}
	}
}

module.exports = login_del;