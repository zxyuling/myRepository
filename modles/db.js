var settings = require('../setting');
var Db		 = require('mongodb').Db;
var Connection=require('mongodb').Connection;
var Server	 = require('mongodb').Server;

function conn(con_del)
{
	var server = new Server(settings.host,settings.port,{auto_reconnect:'ture'});
	var db = new Db(settings.db,server,{safe:'ture'});
	db.open(con_del);


}

exports.conn=conn;
