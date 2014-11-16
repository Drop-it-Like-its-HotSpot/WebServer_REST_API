module.exports = function(router, ChatRoomUsers, Session)
{
	//API calls for /api/chatroomusers to add and get all chatroomusers
	var check_session = require('../session/check_session');
	var error_json = require('../error/error_json');
	router.route('/chatroomusers/room_id/:room_id/:session_id')
	.get(function(req,res){
		new Session({"session_id":req.params.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.params.session_id,model.get('timestamp'))			
			if (result === true) {
				new ChatRoomUsers().where({"Room_id":parseInt(req.params.room_id)}).fetchAll()
				.then(function(result) {
					res.send(result.toJSON());
				}).catch(function(error) {
					console.log(error);
					res.send(error_json("141"));
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