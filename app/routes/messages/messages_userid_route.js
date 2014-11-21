//API calls for /api/messages/room_id to add and get all messages
module.exports = function(router, Messages, Session, error_json, success_json, check_session)
{
	//API Call for /api/messages/user_id/:user_id to get, update, and delete a specific 
	router.route('/messages/user_id/:user_id/:session_id')
	.get(function(req,res){
		new Session({"session_id":req.params.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.params.session_id,model.get('timestamp'))
			if (result === true) {
				new Messages().where({"User_id":parseInt(req.params.user_id)}).fetchAll()
				.then(function(result) {
					res.send(success_json(result.toJSON()));
				}).catch(function(error) {
					console.log(error);
					res.send(error_json("151"));
				});
			}
			else {
				console.log("Session Expired");
				res.send(error_json("103"));
			}
		}).catch(function(error) {
			console.log(error);
			es.send(error_json("101"));
		});
	});
};