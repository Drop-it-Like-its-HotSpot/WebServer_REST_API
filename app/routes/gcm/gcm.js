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
		raw += "'User_id' = ? or "
	}
	raw += "'User_id' = ?";
	
	r_ids = [93];
	console.log("Came here!!");
	console.log(raw);

	//knex('gcm').whereRaw(raw,u_ids)
	new GCMDB().where({"User_id":93}).fetch({require:true})
	.then(function(result) {
		console.log(result);
	}).catch(function(error) {
		console.log(error);
	});
	
	
	sender.send(message, r_ids, 4, function (err, result) {
		console.log(result);
	});
}