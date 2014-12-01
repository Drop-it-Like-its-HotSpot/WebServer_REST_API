//API calls for /api/Messages to add and get all messages
module.exports = function(router, Messages, Session, GCMDB, io, knex, ChatRoomUsers, error_json, success_json, check_session)
{
	var gcm = require('../gcm/gcm');
	router.route('/messages')
	.post(function(req,res) {
		if(req.body.session_id === undefined) {
			res.json({missing_parameter:"session_id",success:false});
			return;
		}
		if(req.body.room_id === undefined) {
			res.json({missing_parameter:"room_id",success:false});
			return;
		}
		if(req.body.message === undefined) {
			res.json({missing_parameter:"message",success:false});
			return;
		}
		new Session({"session_id":req.body.session_id}).fetch({require:true}).then(function(model) {
			var uid = model.get('User_id');
			var result = check_session(Session,req.body.session_id,model.get('timestamp'))
			if (result === true) {
				var data = ({
					"Room_id":parseInt(req.body.room_id),
					"User_id":uid,
					"Message":req.body.message
				});
				
				new Messages().save(data,{method:"insert"}).then(function(message_result) {
					var GCM_Data = message_result.toJSON();
					new ChatRoomUsers().where({"Room_id":parseInt(req.body.room_id)}).fetchAll()
					.then(function(result) {
						var user_arr = result.toJSON();
						var u_ids = [];
						for (u in user_arr)
						{
							if( parseInt(user_arr[u]["User_id"]) !== parseInt(req.body.user_id))
							{
								u_ids.push( parseInt(user_arr[u]["User_id"]));
							}
						}
						gcm(GCM_Data,u_ids,GCMDB, knex);
						io.to(req.body.room_id).emit("New Message!");
						res.send(success_json(message_result.toJSON()));
					}).catch(function(error) {
						console.log(error);
						res.send(error_json("141"));
					});
				}).catch(function(error) {
					console.log(error);
					res.send(error_json("150"));
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
	router.route('/messages/:session_id')
	.get(function(req,res){
		new Session({"session_id":req.params.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.params.session_id,model.get('timestamp'))
			if (result === true) {
				new Messages().fetchAll()
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
		  res.send(error_json("101"));
		});
	});


	//API Call for /api/messages/:m_id to get, update, and delete a specific user
	router.route('/messages/:m_id/:session_id')
	.get(function(req,res){
		new Session({"session_id":req.params.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.params.session_id,model.get('timestamp'))
			if (result === true) {
				new Messages({"m_id":parseInt(req.params.m_id)}).fetch()
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
		  res.send(error_json("101"));
		});
	});
	router.route('/messages/delete/:m_id')
	.post(function(req,res){
		if(req.body.session_id === undefined) {
			res.json({missing_parameter:"session_id",success:false});
			return;
		}
		new Session({"session_id":req.body.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.body.session_id,model.get('timestamp'))
			
			if (result === true) {
				new Messages({"m_id":parseInt(req.params.m_id)}).destroy()
				.then(function(result) {
					res.send(success_json(result.toJSON()));
				}).catch(function(error) {
					console.log(error);
					res.send(error_json("153"));
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
	})
	
	router.route('/messages/put/:m_id')
	.post(function(req,res){
		if(req.body.session_id === undefined) {
			res.json({missing_parameter:"session_id",success:false});
			return;
		}
		new Session({"session_id":req.body.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.body.session_id,model.get('timestamp'))
			if (result === true) {
				var data = ({});
				if(req.body.room_id !== undefined) data.Room_id = Number(req.body.room_id);
				if(req.body.user_id !== undefined) data.User_id = Number(req.body.user_id);
				if(req.body.message !== undefined) data.Message = req.body.message;
				new Messages({"m_id":parseInt(req.params.m_id)}).save(data,{patch:true})
				.then(function(result) {
					res.send(success_json(result.toJSON()));
				}).catch(function(error) {
					console.log(error);
					res.send(error_json("152"));
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