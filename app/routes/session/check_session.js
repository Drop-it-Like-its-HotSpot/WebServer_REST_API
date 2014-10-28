//Session File
module.exports = function(timestamp) 
{
	var moment = require('moment');
	console.log("YAY it Works");
	var diff = moment().diff(timestamp, 'seconds');
	console.log(timestamp);
	console.log(diff);
	
	if (parseInt(diff) > 60) {
		console.log("returning false");
		return false;
	}
	console.log("returning true");
	return true;
	
} 