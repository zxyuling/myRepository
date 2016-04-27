var db = require('./db');
function update_read_del(JSON)
{
	this.json=JSON;
}
update_read_del.prototype.read=function(req,res,callback)
{

	var json=this.json;
	db.conn(con_del);
	function con_del(err,db)
	{
		db.collection('blog',col_del,{safe:true});
		function col_del(err,col)
		{
			if(err)
			{
				console.log('update_del:读取blog文档错误');
				throw err;
			}
			else
			{
				col.findOne({'blogAuthorId':json.blogAuthorId,'blogId':parseInt(json.blogId)},findOne_del);
				function findOne_del(err,doc)
				{
					if(err)
						throw err;
					else
					{
						console.log('huidiao');
						callback(true,doc);
					}
				}
			}
		}
	}
}
module.exports=update_read_del;
