var db = require('./db');
function logout_del(JSON)
{
	this.json = JSON;
}
logout_del.prototype.logout=function(req,res,callback)
{
	res.cookie('userId','',{maxAge:-1});
	callback(true,{'userId':req.cookies.userId});
}
module.exports=logout_del;