module.exports = function(router, ChatRoomUsers, Session, error_json, success_json, check_session)
{
	//API calls for /api/chatroomusers to add and get all chatroomusers
	router.route('/chatroomusers/room_id/:room_id/:session_id')
	.get(function(req,res){
		new Session({"session_id":req.params.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.params.session_id,model.get('timestamp'));		
			if (result === true) {
				knex('chat_room_users')
				.where('Room_id', parseInt(req.params.room_id))
				.join('users','chat_room_users.User_id', '=', 'users.User_id')
				.select('chat_room.*', 'users.DisplayName')
				.then(function(result) {
					res.send(success_json(result));
				}).catch(function(error) {
					console.log(error);
					res.send(error_json("131"));
				});
			}
			else {
				console.log("Session Expired");
				res.send(error_json("103"));
			}
		}).catch(function(error) {
			console.log(error);
			res.send(error_json("101"));
		});
	});
};