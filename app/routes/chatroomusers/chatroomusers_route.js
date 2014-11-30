module.exports = function(router, ChatRoomUsers, Session, error_json, success_json, check_session)
{
	//API calls for /api/chatroomusers to add and get all chatroomusers
	router.route('/chatroomusers')
	.post(function(req,res) {
		if(req.body.session_id === undefined) {
			res.json({missing_parameter:"session_id",success:false});
			return;
		}
		if(req.body.room_id === undefined) {
			res.json({missing_parameter:"room_id",success:false});
			return;
		}
		new Session({"session_id":req.body.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.body.session_id,model.get('timestamp'))
			
			if (result === true) {
				var data = ({
					"User_id":parseInt(model.get("User_id")),
					"Room_id":parseInt(req.body.room_id),
				});
				
				new ChatRoomUsers().save(data,{method:"insert"}).then(function(result) {
					res.send(success_json(result.toJSON()));
				}).catch(function(error) {
					console.log(error);
					res.send(error_json("140"));
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
	
	router.route('/chatroomusers/delete')
	.post(function(req,res) {
		if(req.body.session_id === undefined) {
			res.json({missing_parameter:"session_id",success:false});
			return;
		}
		if(req.body.room_id === undefined) {
			res.json({missing_parameter:"room_id",success:false});
			return;
		}
		new Session({"session_id":req.body.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.body.session_id,model.get('timestamp'))
			
			if (result === true) {
				new ChatRoomUsers().where({"User_id":parseInt(model.get("User_id")),"Room_id":parseInt(req.body.room_id)}).destroy().then(function(result) {
					res.send(success_json({}));
				}).catch(function(error) {
					console.log(error);
					res.send(error_json("143"));
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

	router.route('/chatroomusers/:session_id')
	.get(function(req,res){
		new Session({"session_id":req.params.session_id}).fetch({require:true}).then(function(model) {
			
			var result = check_session(Session,req.params.session_id,model.get('timestamp'))
			
			if (result === true) {
				new ChatRoomUsers().fetchAll()
				.then(function(result) {
					res.send(success_json(result.toJSON()));
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
}