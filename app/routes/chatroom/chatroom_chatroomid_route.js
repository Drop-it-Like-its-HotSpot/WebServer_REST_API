//API Call for /api/chatroom/:chat_id to get, update, and delete a specific user
module.exports = function(router, ChatRoom, Session, knex, error_json, success_json, check_session)
{
	router.route('/chatroom/:chat_id/:session_id')
	.get(function(req,res){
		new Session({"session_id":req.params.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.params.session_id,model.get('timestamp'))
			if (result === true) {
				knex('chat_room')
				.where('chat_id', req.params.chat_id)
				.join('users','chat_room.Room_Admin', '=', 'users.User_id')
				.select('chat_room.*', 'users.DisplayName')
				.then(function(result) {
					res.send(success_json(result));
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
	
	router.route('/chatroom/delete/:chat_id')
	.post(function(req,res){
		if(req.body.session_id === undefined) {
			res.json({missing_parameter:"session_id",success:false});
			return;
		}
		new Session({"session_id":req.body.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.body.session_id,model.get('timestamp'))
			if (result === true) {
				new ChatRoom().where({"chat_id":parseInt(req.params.chat_id),"Room_Admin":parseInt(model.get("User_id"))}).destroy()
				.then(function(result) {
					res.send(success_json(result.toJSON()));
				}).catch(function(error) {
					console.log(error);
					res.send(error_json("133"));
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
	})
	
	router.route('/chatroom/put/:chat_id')
	.post(function(req,res){
		if(req.body.session_id === undefined) {
			res.json({success:false});
			return;
		}
		new Session({"session_id":req.body.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.body.session_id,model.get('timestamp'))
			if (result === true) {
				var data = ({});
				if(req.body.room_admin !== undefined) data.Room_Admin = parseInt(req.body.room_admin);
				if(req.body.latitude !== undefined) data.Latitude = Number(req.body.latitude);
				if(req.body.longitude !== undefined) data.Longitude = Number(req.body.longitude);
				if(req.body.chat_title !== undefined) data.Chat_title = req.body.chat_title.trim();
				if(req.body.chat_dscrpn !== undefined) data.Chat_Dscrpn = req.body.chat_dscrpn.trim();
				
				new ChatRoom({"chat_id":parseInt(req.params.chat_id)}).save(data,{patch:true})
				.then(function(result) {
					res.send(success_json(result.toJSON()));
				}).catch(function(error) {
					console.log(error);
					res.send(error_json("132"));
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