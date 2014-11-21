module.exports = function(router, ChatRoomUsers, Session, knex, error_json, success_json, check_session)
{
	//API calls for /api/chatroomusers to add and get all chatroomusers
	router.route('/chatroomusers/user_id/:session_id')
	.get(function(req,res){
		new Session({"session_id":req.params.session_id}).fetch({require:true}).then(function(model) {
			
			var result = check_session(Session,req.params.session_id,model.get('timestamp'))
			
			var uid = model.get("User_id");
			if (result === true) {
				new ChatRoomUsers().where({"User_id":parseInt(uid)}).fetchAll()
				.then(function(result) {
					var ChatRoomArr = result.toJSON();
					var rooms = [];
					for(c in ChatRoomArr)
					{	
						console.log(ChatRoomArr[c]);
						rooms.push(ChatRoomArr[c]["Room_id"]);
					}
					console.log(rooms);
					knex('chat_room')
					.whereIn("chat_id",rooms)
					.then(function(result) {
						res.send(success_json(result));
					}).catch(function(error) {
						console.log(error);
						res.send(error_json("131"));
					});

				}).catch(function(error) {
					console.log(error);
					res.send(error_json("141"));
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