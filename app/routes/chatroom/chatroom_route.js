//API calls for /api/chatroom to add and get all chatrooms
module.exports = function(router, ChatRoom, Session, Users, knex)
{
	var check_session = require('../session/check_session');
	
	router.route('/chatroom')
	.post(function(req,res) {
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
						res.send(result.toJSON());
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
	router.route('/chatroom/:session_id')
	.get(function(req,res){
		new Session({"session_id":req.params.session_id}).fetch({require:true}).then(function(model) {
			console.log("Session found");
			var result = check_session(Session,req.params.session_id,model.get('timestamp'))
			console.log("Result: " + result);
			if (result === true) {
				new Users({"User_id":model.get("User_id")}).fetch({require:true}).then(function(userModel) {
					knex('chat_room').whereRaw(
						'(acos(sin(radians(userModel.Latitude))*sin(radians("Latitude")) + cos(radians(userModel.Latitude))*cos(radians("Latitude"))*cos(radians("Longitude")-radians(userModel.Longitude))) * 6371 < ($3 * 1.6))')
						.then(function(result) {
							res.send(result.toJSON());
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