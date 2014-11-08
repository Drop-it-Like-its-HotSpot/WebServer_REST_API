//API Call for /api/users/:user_id to get, update, and delete a specific user
module.exports = function(router, Users, Session)
{
	var check_session = require('../session/check_session');
	
	router.route('/users/:user_id/:session_id')
	.get(function(req,res){
		new Session({"session_id":req.params.session_id}).fetch({require:true}).then(function(model) {
			console.log("Session found");
			var result = check_session(Session,req.params.session_id,model.get('timestamp'))
			console.log("Result: " + result);
			if (result === true) {
				new Users({"User_id":parseInt(req.params.user_id)}).fetch()
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
	router.route('/users/:user_id')
	.delete(function(req,res){
		if(req.body.session_id === undefined) {
			res.json({success:false});
			return;
		}
		new Session({"session_id":req.body.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.body.session_id,model.get('timestamp'))
			console.log("Result: " + result);
			if (result === true) {
				new Users({"User_id":parseInt(req.params.user_id)}).destroy()
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
			console.log("Result: " + result);
			if (result === true) {
				var data = ({});
				if(req.body.email_id !== undefined) data.Email_id = req.body.email_id.trim();
				if(req.body.latitude !== undefined) data.Latitude = Number(req.body.latitude);
				if(req.body.longitude !== undefined) data.Longitude = Number(req.body.longitude);
				if(req.body.displayname !== undefined) data.DisplayName = req.body.displayname.trim();
				if(req.body.radius !== undefined) data.radius = Number(req.body.radius);
				
				console.log(data);
				new Users({"User_id":parseInt(req.params.user_id)}).save(data,{patch:true})
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