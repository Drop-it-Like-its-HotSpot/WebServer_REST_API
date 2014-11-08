//Route for user login
module.exports = function(router, Users, Session)
{
    router.route('/logout')
	.post(function(req,res) {
		var data = ({
			"Email_id":req.body.email_id,
		});
		console.log(data);
		new Users(data).fetch({require:true}).then(function(model) {
			var uid = model.get("User_id");
			console.log(uid);
			new Session().where({"User_id":uid}).destroy()
			.then(function(result) {
			  console.log(result.toJSON());
			  res.send("Logged out");
			}).catch(function(error) {
			  console.log(error);
			});
		});
	});
};