//API calls for /api/users to add and get all users
module.exports = function(router, Users, Cred, Session)
{
	var bcrypt = require('bcrypt');
	var check_session = require('../session/check_session');
	
	router.route('/users')
	.post(function(req,res) {
		var data = ({
			"Email_id":req.body.email_id,
			"Latitude":Number(req.body.latitude),
			"Longitude":Number(req.body.longitude),
			"DisplayName":req.body.displayname,
			"radius":Number(req.body.radius)
		});
		console.log(data);
		new Users().save(data,{method:"insert"}).then(function(result) {
			var user_created = result.toJSON();
			var uid = user_created["User_id"];
			bcrypt.genSalt(10, function(err, salt) {
				bcrypt.hash(req.body.password.trim(), salt, function(err, hash) {
					// Store hash in your password DB.
					new Cred().save({"User_id":uid,"Password":hash},{method:"insert"}).then(function(result) {
						res.send(user_created);
					}).catch(function(error) {
						console.log(error);
						res.send('An error occured');
					});
				});
			});

		}).catch(function(error) {
			  console.log(error);
			  res.send('An error occured');
		});
	});
	
	router.route('/users/:session_id')
	.get(function(req,res){
		console.log("Get All");
		new Session({"session_id":req.body.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.params.session_id,model.get('timestamp'))
			console.log("Result: " + result);
			if (result === true) {
				new Users().fetchAll().then(function(userResult) {
				  res.send(userResult.toJSON());
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