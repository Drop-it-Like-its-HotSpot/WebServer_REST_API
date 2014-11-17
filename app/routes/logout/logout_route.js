//Route for user login
module.exports = function(router, Users, Session)
{
	var error_json = require('../error/error_json');
	
    router.route('/logout')
	.post(function(req,res) {
		if(req.body.email_id === undefined) {
			res.json({missing_parameter:"email_id",success:false});
			return;
		}
		
		var data = ({
			"Email_id":req.body.email_id,
		});
		
		new Users(data).fetch({require:true}).then(function(model) {
			var uid = model.get("User_id");
			console.log(uid);
			new Session().where({"User_id":uid}).destroy()
			.then(function(result) {
				console.log(result.toJSON());
				res.send("Logged out");
			}).catch(function(error) {
				console.log(error);
				res.send(error_json("104"));
			});
		});
	});
};