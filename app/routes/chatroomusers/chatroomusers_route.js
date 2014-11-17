module.exports = function(router, ChatRoomUsers, Session)
{
	//API calls for /api/chatroomusers to add and get all chatroomusers
	var check_session = require('../session/check_session');
	
	router.route('/chatroomusers')
	.post(function(req,res) {
		if(req.body.session_id === undefined) {
			res.json({success:false});
			return;
		}
		if(req.body.room_id === undefined) {
			res.json({success:false});
			return;
		}
		new Session({"session_id":req.body.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.body.session_id,model.get('timestamp'))
			
			if (result === true) {
				var data = ({
					"User_id":parseInt(model.get("User_id")),
					"Room_id":parseInt(req.body.room_id),
				});
				
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
	})
	
	.delete(function(req,res) {
		new Session({"session_id":req.body.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.body.session_id,model.get('timestamp'))
			
			if (result === true) {
				new ChatRoomUsers().where({"User_id":parseInt(model.get("User_id")),"Room_id":parseInt(req.body.room_id)}).destroy().then(function(result) {
					res.send(result);
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
			
			var result = check_session(Session,req.params.session_id,model.get('timestamp'))
			
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