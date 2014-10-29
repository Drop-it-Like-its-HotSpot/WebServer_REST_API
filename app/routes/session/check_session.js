//Session File
module.exports = function(Session,session_id,timestamp) 
{
	var moment = require('moment');
	var diff = moment().diff(timestamp, 'seconds');
	
	if (parseInt(diff) > 60) {
		console.log("returning false");
		new Session().where({"session_id":session_id}).destroy()
		.then(function(result) {
		  console.log(result.toJSON());
		}).catch(function(error) {
		  console.log(error);
		});
		return false;
	}
	console.log("returning true");
	return true;
	
} 