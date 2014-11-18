//API calls for /api/chatroom to add and get all chatrooms
module.exports = function(router, ChatRoom, Session, Users, ChatRoomUsers, knex)
{
	var check_session = require('../session/check_session');
	var error_json = require('../error/error_json');
	
	router.route('/chatroom')
	.post(function(req,res) {
		if(req.body.session_id === undefined) {
			res.json({missing_parameter:"session_id",success:false});
			return;
		}
		if(req.body.latitude === undefined) {
			res.json({missing_parameter:"latitude",success:false});
			return;
		}
		if(req.body.longitude === undefined) {
			res.json({missing_parameter:"longitude",success:false});
			return;
		}
		if(req.body.chat_title === undefined) {
			res.json({missing_parameter:"chat_title",success:false});
			return;
		}
		if(req.body.chat_dscrpn === undefined) {
			res.json({missing_parameter:"chat_dscrpn",success:false});
			return;
		}
		new Session({"session_id":req.body.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.body.session_id,model.get('timestamp'))
			if (result === true) {
				var data = ({
					"Room_Admin":model.get("User_id"),
					"Latitude":Number(req.body.latitude),
					"Longitude":Number(req.body.longitude),
					"Chat_title":req.body.chat_title,
					"Chat_Dscrpn":req.body.chat_dscrpn
				});
				new ChatRoomUsers().where({"User_id":parseInt(model.get("User_id")),"created":true}).fetchAll().then(function(chatRoomUsersModel) {
					if (chatRoomUsersModel.length >= 10) {
						console.log("User already created too many chat rooms");
						res.send(error_json("134"));
						return;
					}
					new ChatRoom().save(data,{method:"insert"}).then(function(result) {
						var ret = result.toJSON();
						ret.success = true;
						var chatroomuserData = ({
							"User_id":parseInt(result.get("Room_Admin")),
							"Room_id":parseInt(result.get("chat_id")),
							"created":true
						});
						new ChatRoomUsers().save(chatroomuserData,{method:"insert"}).then(function(result) {
						}).catch(function(error) {
							console.log(error);
							res.send(error_json("140"));
						});
						res.send(ret);
					}).catch(function(error) {
						console.log(error);
						res.send(error_json("130"));
					});
				}).catch(function(error) {
					console.log(error);
					res.send(error_json("141"));
				});
			}
			else {
				console.log("Session Expired");
				res.json({success:false,message:'Session Expired'});
			}
		}).catch(function(error) {
			console.log(error);
			res.send(error_json("101"));
		});
	});
	router.route('/chatroom/:session_id')
	.get(function(req,res){
		new Session({"session_id":req.params.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.params.session_id,model.get('timestamp'));
			var uid = model.get("User_id");
			
			if (result === true) {
				new Users({"User_id":model.get("User_id")}).fetch({require:true}).then(function(userModel) {
					var raw = '(acos(sin(radians('+userModel.get("Latitude")+'))*sin(radians(chat_room."Latitude")) + cos(radians('+userModel.get("Latitude")+'))*cos(radians(chat_room."Latitude"))*cos(radians(chat_room."Longitude")-radians('+userModel.get("Longitude")+'))) * 6371 < ('+userModel.get("radius")+' * 1.6))';
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