//API calls for /api/users to add and get all users
module.exports = function(router, Users, Cred, Session)
{
	var bcrypt = require('bcrypt');
	var check_session = require('../session/check_session');
	var error_json = require('../error/error_json');
	
	router.route('/users')
	.post(function(req,res) {
		if(req.body.email_id === undefined) {
			res.json({missing_parameter:"email_id",success:false});
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
		if(req.body.displayname === undefined) {
			res.json({missing_parameter:"displayname",success:false});
			return;
		}
		if(req.body.radius === undefined) {
			res.json({missing_parameter:"radius",success:false});
			return;
		}
		var data = ({
			"Email_id":req.body.email_id,
			"Latitude":Number(req.body.latitude),
			"Longitude":Number(req.body.longitude),
			"DisplayName":req.body.displayname,
			"radius":Number(req.body.radius)
		});
		new Users().save(data,{method:"insert"}).then(function(result) {
			var user_created = result.toJSON();
			var uid = user_created["User_id"];
			bcrypt.genSalt(10, function(err, salt) {
				bcrypt.hash(req.body.password.trim(), salt, function(err, hash) {
					// Store hash in your password DB.
					new Cred().save({"User_id":uid,"Password":hash},{method:"insert"}).then(function(result) {
						user_created.success = true;
						res.send(user_created);
					}).catch(function(error) {
						console.log(error);
						res.send(error_json(120));
					});
				});
			});

		}).catch(function(error) {
			  console.log(error);
			  res.send(error_json(110));
		});
	});
	
	router.route('/users/:session_id')
	.get(function(req,res){
		new Session({"session_id":req.params.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.params.session_id,model.get('timestamp'))
			if (result === true) {
				new Users().fetchAll().then(function(userResult) {
					res.send(userResult.toJSON());
				}).catch(function(error) {
					console.log(error);
					res.send(error_json(111));
				});

			}
			else {
				console.log("Session Expired");
				res.send(error_json(103));
			}
		}).catch(function(error) {
			console.log(error);
			res.send(error_json(101));
		});
	});
};