var db = require('./db');
function set_del(JSON)
{
	this.json=JSON;
}
set_del.prototype.set=function(res,req)
{
	var json=this.json;
	db.conn(con_del);//建立数据库连接
	function con_del(err,db)
	{
		console.log('成功建立连接');
		db.collection('user',col_del,{safe:true});//选择数据库文档
		function col_del(err,col)
		{
			console.log('成功选择文档');//开始数据库操作
			col.update({username:json.username},{$set:{password:json.password}},{safe:true},update_del);
			function update_del(err,result)
			{
				if(err)
					throw err;
				else
				{
					console.log(result);
					res.redirect('/personal');
				}
			}
		}
	}

}
module.exports=set_del;