//API Call for /api/chatroom/:chat_id to get, update, and delete a specific user
module.exports = function(router, ChatRoom, Session)
{
	var check_session = require('../session/check_session');
	
	router.route('/chatroom/:chat_id/:session_id')
	.get(function(req,res){
		new Session({"session_id":req.params.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.params.session_id,model.get('timestamp'))
			if (result === true) {
				new ChatRoom({"chat_id":parseInt(req.params.chat_id)}).fetch()
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
	
	router.route('/chatroom/:chat_id')
	.delete(function(req,res){
		if(req.body.session_id === undefined) {
			res.json({missing_parameter:"session_id",success:false});
			return;
		}
		new Session({"session_id":req.body.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.body.session_id,model.get('timestamp'))
			if (result === true) {
				new ChatRoom().where({"chat_id":parseInt(req.params.chat_id),"Room_Admin":parseInt(model.get("User_id"))}).destroy()
				.then(function(result) {
					res.send(result.toJSON());
				}).catch(function(error) {
					console.log(error);
					var message = {error_code:"133",success:false};
					res.send(message);
				});
			}
			else {
				console.log("Session Expired");
				res.json({success:false,message:'Session Expired'});
			}
		}).catch(function(error) {
			console.log(error);
			var message = {error_code:"101",success:false};
			res.send(message);
		});
	})
	.put(function(req,res){
		if(req.body.session_id === undefined) {
			res.json({success:false});
			return;
		}
		new Session({"session_id":req.body.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.body.session_id,model.get('timestamp'))
			if (result === true) {
				var data = ({});
				if(req.body.room_admin !== undefined) data.Room_Admin = parseInt(req.body.room_admin);
				if(req.body.latitude !== undefined) data.Latitude = Number(req.body.latitude);
				if(req.body.longitude !== undefined) data.Longitude = Number(req.body.longitude);
				if(req.body.chat_title !== undefined) data.Chat_title = req.body.chat_title.trim();
				if(req.body.chat_dscrpn !== undefined) data.Chat_Dscrpn = req.body.chat_dscrpn.trim();
				
				new ChatRoom({"chat_id":parseInt(req.params.chat_id)}).save(data,{patch:true})
				.then(function(result) {
					res.send(result.toJSON());
				}).catch(function(error) {
					console.log(error);
					var message = {error_code:"132",success:false};
					res.send(message);
				});
			}
			else {
				console.log("Session Expired");
				res.json({success:false,message:'Session Expired'});			
			}
		}).catch(function(error) {
			console.log(error);
			var message = {error_code:"101",success:false};
			res.send(message);
		});
	});
}