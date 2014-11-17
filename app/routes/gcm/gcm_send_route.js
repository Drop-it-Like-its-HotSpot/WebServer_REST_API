//API calls for /api/gcm to save registration ids
module.exports = function(router, GCMDB, knex)
{
	var gcm = require('../gcm/gcm');
	router.route('/gcm/send')
	.post(function(req,res) {
		var data = {Test:req.body.data};
		gcm(data,JSON.parse(req.body.uids),GCMDB, knex, res);
	});
}