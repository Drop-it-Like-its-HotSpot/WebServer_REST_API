//Google Cloud Messaging Function
module.exports = function(data,u_ids, GCMDB, knex) 
{
	var gcm = require('node-gcm');

	// create a message with default values
	var message = new gcm.Message();
	var apiKey = require('../../config/gcmconfig.js');
	var sender = new gcm.Sender(apiKey);
	message.addDataWithObject(data);
	
	var raw = '';
	for (u=0; u<u_ids.length-1; u++)
	{
		raw += "'User_id' = " + u_ids[u] + " or "
	}
	raw += "'User_id' = "+u_ids[u_ids.length-1];
	
	r_ids = [];
	console.log("Came here!!");
	console.log(raw);
	console.log(knex);
	new GCMDB().where({"User_id":u_ids[0]}).fetch()
	.then(function(result) {
		console.log(result);
	}).catch(function(error) {
		console.log(error);
	});
	
	sender.send(message, r_ids, 4, function (err, result) {
		console.log(result);
	});
}