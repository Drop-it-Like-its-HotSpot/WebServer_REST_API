//Route for user update location
module.exports = function(router, Users, Session)
{
	var check_session = require('../session/check_session');
	var error_json = require('../error/error_json');
	
    router.route('/updatelocation')
	.post(function(req,res) {
		if(req.body.session_id === undefined) {
			res.json({missing_parameter:"session_id",success:false});
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
		var data = ({
			"Latitude":Number(req.body.latitude),
			"Longitude":Number(req.body.longitude)
		});
		new Session({"session_id":req.body.session_id}).fetch({require:true}).then(function(model) {
			
			var result = check_session(Session,req.body.session_id,model.get('timestamp'))
			
			if (result === true) {
				new Users({"User_id":model.get("User_id")}).save(data,{patch:true})
				.then(function(result) {
					res.send(result.toJSON());
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