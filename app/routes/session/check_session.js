//Session File
module.exports = function(req,Session) 
{
	var moment = require('moment');

	new Session({"session_id":req.body.session_id, "User_id":parseInt(req.params.user_id)}).fetch({require:true}).then(function(model) {
		var timestamp = moment(model.get("timestamp"));
		var diff = moment().diff(timestamp, 'seconds');
		console.log(timestamp);
		console.log(diff);
		
		if (diff > 60) {
			throw "Session expired";
		}
		return true;
	}).catch(function(error) {
		console.log(error);
		res.send('An error occured');
	});
} 