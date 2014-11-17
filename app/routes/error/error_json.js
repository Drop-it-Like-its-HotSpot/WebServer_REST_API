//Error File
module.exports = function(ErrorCode) 
{
	var fs = require('fs');
	fs.readFile('./app/routes/error/ErrorList.json', 'utf8', function(err, data) {
		if (err) throw err;
		var obj = JSON.parse(data);
		var json = {error_code:ErrorCode,success:false,info:obj[ErrorCode]};
		console.log(json);
		return json;
	});
} 