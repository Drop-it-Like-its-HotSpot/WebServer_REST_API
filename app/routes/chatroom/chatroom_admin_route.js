//API calls for /api/chatroom to add and get all chatrooms
module.exports = function(router, ChatRoom, Session, Users, ChatRoomUsers, knex, error_json, success_json, check_session)
{
	router.route('/chatroom/admin/:session_id')
	.get(function(req,res){
		new Session({"session_id":req.params.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.params.session_id,model.get('timestamp'));
			var uid = model.get("User_id");
			console.log("UID: " + uid);			
			if (result === true) {
				new ChatRoom({"Room_Admin":parseInt(uid)}).fetchAll().then(function(chatroomModel) {
					res.send(success_json(chatroomModel.toJSON()));
				}).catch(function(error) {
					console.log(error);
					res.send(error_json("131"));
				});
			}
			else {
				console.log("Session Expired");
				res.json(error_json("103"));
			}
		}).catch(function(error) {
			console.log(error);
			res.send(error_json("101"));
		});
	});
};