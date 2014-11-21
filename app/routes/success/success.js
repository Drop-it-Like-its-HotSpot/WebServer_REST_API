//Successful request
module.exports = function(resJson) 
{
	resJson.success = true;
	return resJson;
} 