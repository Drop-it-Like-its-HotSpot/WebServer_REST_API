//Google Cloud Messaging Function
module.exports = function(data,u_ids, GCM) 
{
	var gcm = require('node-gcm');

	// create a message with default values
	var message = new gcm.Message();
	var apiKey = require('./config/gcmconfig.js');
	var sender = new gcm.Sender(apiKey);
	message.addDataWithObject(data);
	sender.send(message, r_ids, 4, function (err, result) {
		console.log(result);
	});
}