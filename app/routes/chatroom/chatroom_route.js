//API calls for /api/chatroom to add and get all chatrooms
module.exports = function(router, ChatRoom, Session, Users, ChatRoomUsers, knex)
{
	var check_session = require('../session/check_session');
	
	router.route('/chatroom')
	.post(function(req,res) {
		if(req.body.session_id === undefined) {
			res.json({missing_parameter:"session_id",success:false});
			return;
		}
		if(req.body.room_admin === undefined) {
			res.json({missing_parameter:"room_admin",success:false});
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
					"Room_Admin":parseInt(req.body.room_admin),
					"Latitude":Number(req.body.latitude),
					"Longitude":Number(req.body.longitude),
					"Chat_title":req.body.chat_title,
					"Chat_Dscrpn":req.body.chat_dscrpn
				});
				new ChatRoom().save(data,{method:"insert"}).then(function(result) {
						var ret = result.toJSON();
						ret.success = true;
						var chatroomuserData = ({
							"User_id":parseInt(result.get("Room_Admin")),
							"Room_id":parseInt(result.get("chat_id"))
						});
						new ChatRoomUsers().save(chatroomuserData,{method:"insert"}).then(function(result) {
						}).catch(function(error) {
							console.log(error);
							var message = {error_code:"140",success:false};
							res.send(message);
						});
						res.send(ret);
				}).catch(function(error) {
					console.log(error);
					var message = {error_code:"130",success:false};
					res.send(message);
				});
			}
			else {
				console.log("Session Expired");
				res.json({success:false,message:'Session Expired'});
			}
		}).catch(function(error) {
			console.log(error);
			var message = {error_code:"101",success:false};
			res.send(message);
		});
	});
	router.route('/chatroom/:session_id')
	.get(function(req,res){
		new Session({"session_id":req.params.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.params.session_id,model.get('timestamp'))
			if (result === true) {
				new Users({"User_id":model.get("User_id")}).fetch({require:true}).then(function(userModel) {
					var raw = '(acos(sin(radians('+userModel.get("Latitude")+'))*sin(radians("Latitude")) + cos(radians('+userModel.get("Latitude")+'))*cos(radians("Latitude"))*cos(radians("Longitude")-radians('+userModel.get("Longitude")+'))) * 6371 < ('+userModel.get("radius")+' * 1.6))';
					knex('chat_room').whereRaw(raw).orderBy('chat_id', 'desc').then(function(result) {
						res.send(result);
					}).catch(function(error) {
						console.log(error);
						var message = {error_code:"131",success:false};
						res.send(message);
					});
				}).catch(function(error) {
					console.log(error);
					var message = {error_code:"111",success:false};
					res.send(message);
				});
			}
			else {
				console.log("Session Expired");
				res.json({success:false,message:'Session Expired'});
			}
		}).catch(function(error) {
			console.log(error);
			var message = {error_code:"101",success:false};
			res.send(message);
		});
	});
}