var db = require('./db.js');
function update_write_del(JSON)
{
	this.json = JSON;
}
update_write_del.prototype.write = function(req,res,callback)
{
	var json = this.json;
	db.conn(con_del);
	function con_del(err,db)
	{
		if(err)
			throw err;
		db.collection('blog',col_del,{safe:true});
		function col_del(err,col)
		{
			col.update({'blogAuthorId':json.blogAuthorId,'blogId':json.blogId},{$set:json},{safe:true},update_del);
			function update_del(err,result)
			{
				if(err)
					throw err;
				console.log(result);
				callback(true,{});
			}
		}
	}
}
module.exports = update_write_del;