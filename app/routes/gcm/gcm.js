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
	console.log(raw);
	console.log(u_ids);


	knex('gcm')
	.whereIn("User_id",u_ids)
	.then(function(result) {
		for( u in result)
		{
			console.log(result);
			r_ids.push(result[u]["reg_id"]);
			console.log(r_ids);
			sender.send(message, r_ids, 4, function (err, result) {
				console.log(err);
				console.log(result);
				if(err !== null) res.send(err);
				else res.send(result);

			});
		}
	}).catch(function(error) {
		console.log(error);
		res.send(error);
	});
	
	

}