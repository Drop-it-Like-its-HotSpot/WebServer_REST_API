//API Call for /api/users/:user_id to get, update, and delete a specific user
module.exports = function(router, Users, Session, error_json, success_json, check_session)
{
	router.route('/users/:user_id/:session_id')
	.get(function(req,res){
		new Session({"session_id":req.params.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.params.session_id,model.get('timestamp'))
			if (result === true) {
				new Users({"User_id":parseInt(req.params.user_id)}).fetch()
				.then(function(result) {
					res.send(success_json(result.toJSON()));
				}).catch(function(error) {
					console.log(error);
					res.send(error_json("111"));
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
	router.route('/users/delete/:user_id')
	.post(function(req,res){
		if(req.body.session_id === undefined) {
			res.json({missing_parameter:"session_id",success:false});
			return;
		}
		new Session({"session_id":req.body.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.body.session_id,model.get('timestamp'))
			if (result === true) {
				new Users({"User_id":parseInt(req.params.user_id)}).destroy()
				.then(function(result) {
					res.send(success_json(result.toJSON()));
				}).catch(function(error) {
					console.log(error);
					res.send(error_json("113"));
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
	router.route('/users/put/:user_id')
	.post(function(req,res){
		new Session({"session_id":req.body.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.body.session_id,model.get('timestamp'))
			if (result === true) {
				var data = ({});
				if(req.body.email_id !== undefined) data.Email_id = req.body.email_id.trim();
				if(req.body.latitude !== undefined) data.Latitude = Number(req.body.latitude);
				if(req.body.longitude !== undefined) data.Longitude = Number(req.body.longitude);
				if(req.body.displayname !== undefined) data.DisplayName = req.body.displayname.trim();
				if(req.body.radius !== undefined) data.radius = Number(req.body.radius);
				
				new Users({"User_id":parseInt(req.params.user_id)}).save(data,{patch:true})
				.then(function(result) {
					res.send(success_json(result.toJSON()));
				}).catch(function(error) {
					console.log(error);
					res.send(error_json("112"));
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