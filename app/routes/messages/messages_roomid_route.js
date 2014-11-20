//API calls for /api/messages/room_id to add and get all messages
module.exports = function(router, Messages, ChatRoomUsers, Session,io, knex)
{
	var check_session = require('../session/check_session');
	var error_json = require('../error/error_json');
	
	//API Call for /api/messages/room_id/:room_id to get messages from a specific room
	router.route('/messages/room_id/:room_id/:session_id')
	.get(function(req,res){
		new Session({"session_id":req.params.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.params.session_id,model.get('timestamp'))
			if (result === true) {
				var uid = model.get("User_id");
				new ChatRoomUsers({"Room_id":req.params.room_id,"User_id":uid}).fetch({require:true})
				.then(function(crumodel){
				
					knex('messages')
					.select('users.DisplayName','messages.*')
					.innerJoin('users','users.User_id','messages.User_id')
					.where("Room_id","=",parseInt(req.params.room_id))
					.andWhere("TimeStamp",">",crumodel.get("joined"))
					.orderBy("TimeStamp","asc")
					
					.then(function(result) {
					
						io.on('connection', function(socket){
							socket.join(req.params.room_id);
							console.log('a user connected');
							socket.on('disconnect', function(){
								console.log('user disconnected');
							});
						});
						
						var ret = result.toJSON();
						ret.success = true;
						res.send(ret);
					}).catch(function(error) {
						console.log(error);
						res.json(error_json("151"));
					});
				
				}).catch(function(error) {
					console.log(error);
					res.json(error_json("141"));
				});
			}
			else {
				console.log("Session Expired");
				res.json(error_json("103"));
			}
		}).catch(function(error) {
			console.log(error);
			res.json(error_json("101"));
		});
	});
	
	router.route('/messages/room_id/:room_id/:timestamp/:session_id')
	.get(function(req,res){
		new Session({"session_id":req.params.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.params.session_id,model.get('timestamp'))
			if (result === true) {
				knex('messages')
					.select('users.DisplayName','messages.*')
					.innerJoin('users','users.User_id','messages.User_id')
					.where("Room_id","=",parseInt(req.params.room_id))
					.andWhere("TimeStamp",">",req.params.timestamp)
					.orderBy("TimeStamp","asc")
				.then(function(result) {
					res.send(result.toJSON());
				}).catch(function(error) {
					console.log(error);
					res.send(error_json("151"));
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