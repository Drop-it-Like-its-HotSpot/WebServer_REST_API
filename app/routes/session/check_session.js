//Session File
module.exports = function(Session,session_id,timestamp) 
{
	var moment = require('moment');
	console.log("YAY it Works");
	var diff = moment().diff(timestamp, 'seconds');
	console.log(timestamp);
	console.log(diff);
	
	if (parseInt(diff) > 60) {
		console.log("returning false");
		console.log("Session_id: " + session_id);
		new Session().where({"session_id":session_id}).destroy()
		.then(function(result) {
		  console.log("Seriously: " + result.toJson());
		}).catch(function(error) {
		  console.log(error);
		});
		return false;
	}
	console.log("returning true");
	return true;
	
} 