//Error File
module.exports = function(ErrorCode) 
{
	var fs = require('fs');
	console.log(fs.readdirSync('.'));
	fs.readFile('./app/routes/error/ErrorList.json', 'utf8', function(err, data) {
		if (err) throw err;
		console.log(data);
		var obj = JSON.parse(data);
		console.log(obj);
		return {error_code:ErrorCode,success:false,info:obj.get(ErrorCode)};
	});
} 