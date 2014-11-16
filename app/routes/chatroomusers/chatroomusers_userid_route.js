module.exports = function(router, ChatRoomUsers, Session)
{
	//API calls for /api/chatroomusers to add and get all chatroomusers
	var check_session = require('../session/check_session');
	router.route('/chatroomusers/user_id/:session_id')
	.get(function(req,res){
		new Session({"session_id":req.params.session_id}).fetch({require:true}).then(function(model) {
			
			var result = check_session(Session,req.params.session_id,model.get('timestamp'))
			
			var uid = model.get("User_id");
			if (result === true) {
				new ChatRoomUsers().where({"User_id":parseInt(uid)}).fetchAll()
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