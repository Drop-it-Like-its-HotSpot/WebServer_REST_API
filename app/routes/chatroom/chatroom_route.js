//API calls for /api/chatroom to add and get all chatrooms
module.exports = function(router, ChatRoom, Session, Users, knex)
{
	var check_session = require('../session/check_session');
	
	router.route('/chatroom')
	.post(function(req,res) {
		if(req.body.session_id === undefined) {
			res.json({success:false});
			return;
		}
		if(req.body.room_admin === undefined) {
			res.json({success:false});
			return;
		}
		if(req.body.latitude === undefined) {
			res.json({success:false});
			return;
		}
		if(req.body.longitude === undefined) {
			res.json({success:false});
			return;
		}
		if(req.body.chat_title === undefined) {
			res.json({success:false});
			return;
		}
		if(req.body.chat_dscrpn === undefined) {
			res.json({success:false});
			return;
		}
		new Session({"session_id":req.body.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.body.session_id,model.get('timestamp'))
			console.log("Result: " + result);
			if (result === true) {
				var data = ({
					"Room_Admin":parseInt(req.body.room_admin),
					"Latitude":Number(req.body.latitude),
					"Longitude":Number(req.body.longitude),
					"Chat_title":req.body.chat_title,
					"Chat_Dscrpn":req.body.chat_dscrpn
				});
				console.log(data);
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
							res.send('An error occured');
						});
						res.send(ret);
				}).catch(function(error) {
					  console.log(error);
					  res.json({success:false});
				});
			}
			else {
				console.log("Session Expired");
				res.json({success:false,message:'Session Expired'});
			}
		}).catch(function(error) {
			  console.log(error);
			  res.json({success:false});
		});
	});
	router.route('/chatroom/:session_id')
	.get(function(req,res){
		new Session({"session_id":req.params.session_id}).fetch({require:true}).then(function(model) {
			console.log("Session found");
			var result = check_session(Session,req.params.session_id,model.get('timestamp'))
			console.log("Result: " + result);
			if (result === true) {
				new Users({"User_id":model.get("User_id")}).fetch({require:true}).then(function(userModel) {
					var raw = '(acos(sin(radians('+userModel.get("Latitude")+'))*sin(radians("Latitude")) + cos(radians('+userModel.get("Latitude")+'))*cos(radians("Latitude"))*cos(radians("Longitude")-radians('+userModel.get("Longitude")+'))) * 6371 < ('+userModel.get("radius")+' * 1.6))';
					knex('chat_room').whereRaw(raw).then(function(result) {
						res.send(result);
					}).catch(function(error) {
					  console.log(error);
					  res.send('An error occured');
					});
				}).catch(function(error) {
				  console.log(error);
				  res.send('An error occured');
				});
			}
			else {
				console.log("Session Expired");
				res.send('Session Expired');
			}
		}).catch(function(error) {
		  console.log(error);
		  res.send('An error occured');
		});
	});
}