//Session File
module.exports = function(session_id,Session) 
{
	var moment = require('moment');
	console.log("YAY it Works");
	new Session({"session_id":session_id}).fetch({require:true}).then(function(model) {
		var timestamp = moment(model.get("timestamp"));
		var diff = moment().diff(timestamp, 'seconds');
		console.log(timestamp);
		console.log(diff);
		
		if (parseInt(diff) > 60) {
			return false;;
		}
		return true;
	}).catch(function(error) {
		console.log(error);
	});
} 