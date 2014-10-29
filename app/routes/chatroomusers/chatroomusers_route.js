module.exports = function(router, ChatRoomUsers)
{
	//API calls for /api/chatroomusers to add and get all chatroomusers
	router.route('/chatroomusers')
	.post(function(req,res) {
		new Session({"session_id":req.body.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.body.session_id,model.get('timestamp'))
			console.log("Result: " + result);
			if (result === true) {
				var data = ({
					"User_id":parseInt(req.body.user_id),
					"Room_id":parseInt(req.body.room_id),
				});
				console.log(data);
				new ChatRoomUsers().save(data,{method:"insert"}).then(function(result) {
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

	router.route('/chatroomusers/:session_id')
	.get(function(req,res){
		new Session({"session_id":req.params.session_id}).fetch({require:true}).then(function(model) {
			console.log("Session found");
			var result = check_session(Session,req.params.session_id,model.get('timestamp'))
			console.log("Result: " + result);
			if (result === true) {
				new ChatRoomUsers().fetchAll()
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
}