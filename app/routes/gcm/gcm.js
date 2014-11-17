//Google Cloud Messaging Function
module.exports = function(data,u_ids, GCMDB, knex, res) 
{
	var gcm = require('node-gcm');

	// create a message with default values
	var message = new gcm.Message();
	var apiKey = require('../../config/gcmconfig.js');
	var sender = new gcm.Sender(apiKey);
	message.addDataWithObject(data);
	
	console.log("Came here!!");
	console.log(u_ids);
	r_ids = [];
	var response = [];

	knex('gcm')
	.whereIn("User_id",u_ids)
	.then(function(result) {
		console.log(result);
		for( u in result)
		{
			r_ids.push(result[u]["reg_id"]);
			console.log(r_ids);
			sender.send(message, r_ids, 4, function (err, ret) {
				console.log(err);
				console.log(ret);
				if(err !== null) response.push(err);
				else response.push(ret);

			});
		}
		res.send(response);
	}).catch(function(error) {
		console.log(error);
		res.send(error);
	});
	
	

}