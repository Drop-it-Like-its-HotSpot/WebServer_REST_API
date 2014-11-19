//API calls for /api/chatroom/radius get all chatrooms
module.exports = function(router, ChatRoom, Session, Users, ChatRoomUsers, knex)
{
	var check_session = require('../session/check_session');
	var error_json = require('../error/error_json');
	
	router.route('/chatroom/radius/:radius/:session_id')
	.get(function(req,res){
		new Session({"session_id":req.params.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.params.session_id,model.get('timestamp'));
			var uid = model.get("User_id");
			
			if (result === true) {
				new Users({"User_id":model.get("User_id")}).fetch({require:true}).then(function(userModel) {
					var raw = '(acos(sin(radians('+userModel.get("Latitude")+'))*sin(radians(chat_room."Latitude")) + cos(radians('+userModel.get("Latitude")+'))*cos(radians(chat_room."Latitude"))*cos(radians(chat_room."Longitude")-radians('+userModel.get("Longitude")+'))) * 6371 < ('+parseInt(req.params.radius)+' * 1.6))';
					knex('chat_room')
					.whereRaw(raw)
					.join('users','chat_room.Room_Admin', '=', 'users.User_id')
					.select('chat_room.*', 'users.DisplayName')
					.orderBy('chat_id', 'desc')
					.then(function(result) {
						var ChatRoomList = result;
						new ChatRoomUsers().where({"User_id":uid}).fetchAll()
						.then(function(userModel) {
							var roomList = userModel.toJSON();
							
							for(r in roomList)
							{
								var rid = roomList[r]["Room_id"];
								for( i=0; i<ChatRoomList.length; i++)
								{
									if(ChatRoomList[i]["chat_id"] === rid)
									{
										ChatRoomList.splice(i,1);
									}
								}
							}
							ChatRoomList.success = true;
							res.send(ChatRoomList);
						}).catch(function(error) {
							console.log(error);
							res.send(error_json("142"));
						});

					}).catch(function(error) {
						console.log(error);
						res.send(error_json("131"));
					});
				}).catch(function(error) {
					console.log(error);
					res.send(error_json("111"));
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
}