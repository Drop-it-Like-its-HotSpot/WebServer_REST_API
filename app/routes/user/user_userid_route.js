//API Call for /api/users/:user_id to get, update, and delete a specific user
module.exports = function(router, Users, Session)
{
	var check_session = require('../session/check_session');
	
	router.route('/users/:user_id/:session_id')
	.get(function(req,res){
		new Users({"User_id":parseInt(req.params.user_id)}).fetch()
		.then(function(result) {
		  res.send(result.toJSON());
		}).catch(function(error) {
		  console.log(error);
		  res.send('An error occured');
		});
	});
	router.route('/users/:user_id')
	.delete(function(req,res){
		check_session(req.body.session_id,Session).then(function(worked) {
			if (worked) {
				new Users({"User_id":parseInt(req.params.user_id)}).destroy()
				.then(function(result) {
				  res.send(result.toJSON());
				}).catch(function(error) {
				  console.log(error);
				  res.send('An error occured');
				});
			}
		}).catch(function(error) {
		  console.log(error);
		  res.send('An error occured');
		});
	})
	.put(function(req,res){
		new Session({"session_id":req.body.session_id}).fetch({require:true}).then(function(model) {
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
		}).catch(function(error) {
			  console.log(error);
			  res.send('An error occured');
		});
	});
};