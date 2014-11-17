//API calls for /api/Messages to add and get all messages
module.exports = function(router, Messages, Session, GCMDB, io, knex, ChatRoomUsers)
{
	var check_session = require('../session/check_session');
	var gcm = require('../gcm/gcm');
	router.route('/messages')
	.post(function(req,res) {
		new Session({"session_id":req.body.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.body.session_id,model.get('timestamp'))
			if (result === true) {
				var data = ({
					"Room_id":parseInt(req.body.room_id),
					"User_id":parseInt(req.body.user_id),
					"Message":req.body.message
				});
				
				new Messages().save(data,{method:"insert"}).then(function(result) {
					new ChatRoomUsers().where({"Room_id":parseInt(req.body.room_id)}).fetchAll()
					.then(function(result) {
						var user_arr = result;
						var u_ids = [];
						for (u in user_arr)
						{
							if(u["User_id"] !== parseInt(req.body.user_id))
							{
								u_ids.push(u["User_id"]);
							}
						}
						console.log(u_ids);
						gcm(data,u_ids,GCMDB, knex);
						io.to(req.body.room_id).emit("New Message!");
						res.send({success:true}));
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
	router.route('/messages/:session_id')
	.get(function(req,res){
		new Session({"session_id":req.params.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.params.session_id,model.get('timestamp'))
			if (result === true) {
				new Messages().fetchAll()
				.then(function(result) {
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


	//API Call for /api/messages/:m_id to get, update, and delete a specific user
	router.route('/messages/:m_id/:session_id')
	.get(function(req,res){
		new Session({"session_id":req.params.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.params.session_id,model.get('timestamp'))
			if (result === true) {
				new Messages({"m_id":parseInt(req.params.m_id)}).fetch()
				.then(function(result) {
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
	router.route('/messages/:m_id')
	.delete(function(req,res){
		new Session({"session_id":req.body.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.body.session_id,model.get('timestamp'))
			
			if (result === true) {
				new Messages({"m_id":parseInt(req.params.m_id)}).destroy()
				.then(function(result) {
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
	})
	.put(function(req,res){
		new Session({"session_id":req.body.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.body.session_id,model.get('timestamp'))
			if (result === true) {
				var data = ({});
				if(req.body.room_id !== undefined) data.Room_id = Number(req.body.room_id);
				if(req.body.user_id !== undefined) data.User_id = Number(req.body.user_id);
				if(req.body.message !== undefined) data.Message = req.body.message;
				new Messages({"m_id":parseInt(req.params.m_id)}).save(data,{patch:true})
				.then(function(result) {
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
	
	

};