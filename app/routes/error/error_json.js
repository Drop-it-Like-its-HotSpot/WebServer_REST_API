//Error File
module.exports = function(ErrorCode) 
{
	var fs = require('fs');
	var obj = JSON.parse(fs.readFileSync('../error/ErrorList.json', 'utf8'));
	return {error_code:ErrorCode,success:false,info:obj.get(ErrorCode)};
} 