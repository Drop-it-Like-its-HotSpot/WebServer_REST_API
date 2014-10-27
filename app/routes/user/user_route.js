//API calls for /api/users to add and get all users
module.exports = function(router, Users, Cred)
{
	var bcrypt = require('bcrypt');
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
				var uid = result.User_id ;
				console.log(uid);
				bcrypt.genSalt(10, function(err, salt) {
					bcrypt.hash(req.body.password, salt, function(err, hash) {
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

	})
	.get(function(req,res){
		new Users().fetchAll()
		.then(function(result) {
		  res.send(result.toJSON());
		}).catch(function(error) {
		  console.log(error);
		  res.send('An error occured');
		});
	});
};