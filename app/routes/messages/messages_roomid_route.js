//API calls for /api/messages/room_id to add and get all messages
module.exports = function(router, Messages, Session)
{
	var check_session = require('../session/check_session');
	
	//API Call for /api/messages/room_id/:room_id to get messages from a specific room
	router.route('/messages/room_id/:room_id/:session_id')
	.get(function(req,res){
		new Session({"session_id":req.params.session_id}).fetch({require:true}).then(function(model) {
			console.log("Session found");
			var result = check_session(Session,req.params.session_id,model.get('timestamp'))
			console.log("Result: " + result);
			if (result === true) {
				new Messages().query(function(qb)
					{
						qb.where("Room_id","=",parseInt(req.params.room_id))
						.orderBy("TimeStamp",asc);
					}
				)
				.fetchAll()
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