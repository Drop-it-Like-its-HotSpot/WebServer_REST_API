//Session File
module.exports = function(Session,session_id,timestamp) 
{
	var moment = require('moment');
	var diff = moment().diff(timestamp, 'minutes');
	
	if (parseInt(diff) > 60) {
		console.log("returning false");
		new Session().where({"session_id":session_id}).destroy()
		.then(function(result) {
		}).catch(function(error) {
			console.log(error);
		});
		return false;
	}
	return true;
	
} 