//Error File
module.exports = function(ErrorCode) 
{
	var fs = require('fs');
	var data = fs.readFileSync('./app/routes/error/ErrorList.json', 'utf8');
	var obj = JSON.parse(data);
	var json = {error_code:ErrorCode,success:false,info:obj[ErrorCode]};
	console.log(json);
	return json;
} 