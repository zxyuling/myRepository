var db=require('./db');
function commentary_del(JSON)
{
	this.json=JSON;
}
commentary_del.prototype.commentary = function(req,res,callback)
{
	var json = this.json;
	db.conn(con_del);
	function con_del(err,db)
	{
		if(err)
		{
			console.log('commentary_del:连接数据库失败');
			throw err;
		}
		db.collection('commentary',col_del,{safe:true});
		function col_del(err,col)
		{
			col.insert(json,{safe:true},insert_del);
			function insert_del(err,result)
			{
				if(err)
				{
					console.log('commentary_del:插入失败');
					throw err;
				}
				db.collection('blog',col_del,{safe:true});
				function col_del(err,col)
				{
					col.update({'blogAuthorId':json.blogAuthorId,'blogId':parseInt(json.blogId)},{$inc:{commentaryNum:1}},{safe:true},update_del);
					function update_del(err,result)
					{
						if(err)
						{
							console.log('commentary_del:更新um失败');
							throw err;
						}
						console.log(result);
						callback(true,{});
					}
				}
				
			}
		}
	}
}
module.exports = commentary_del;