//Route for user update location
module.exports = function(router, Users, Session)
{
	var check_session = require('../session/check_session');
	
    router.route('/updatelocation')
	.post(function(req,res) {
		var data = ({
			"Latitude":Number(req.body.latitude),
			"Longitude":Number(req.body.longitude)
		});
		new Session({"session_id":req.body.session_id}).fetch({require:true}).then(function(model) {
			console.log("Session found");
			var result = check_session(Session,req.body.session_id,model.get('timestamp'))
			console.log("Result: " + result);
			if (result === true) {
				new Users({"User_id":model.get("User_id")}).save(data,{patch:true})
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