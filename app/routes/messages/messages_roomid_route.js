//API calls for /api/messages/room_id to add and get all messages
module.exports = function(router, Messages, ChatRoomUsers, Session)
{
	var check_session = require('../session/check_session');
	
	//API Call for /api/messages/room_id/:room_id to get messages from a specific room
	router.route('/messages/room_id/:room_id/:session_id')
	.get(function(req,res){
		new Session({"session_id":req.params.session_id}).fetch({require:true}).then(function(model) {
			console.log("Session found");
			var result = check_session(Session,req.params.session_id,model.get('timestamp'))
			var uid = model.get("User_id");
			console.log("Result: " + result);
			new ChatRoomUsers({"Room_id":req.params.room_id,"User_id":uid}).fetch({require:true})
			.then(function(crumodel){
				if (result === true) {
					new Messages().query(function(qb)
						{
							qb.where("Room_id","=",parseInt(req.params.room_id))
							.andWhere("TimeStamp",">",crumodel.get("joined"))
							.orderBy("TimeStamp","asc");
						}
					)
					.fetchAll()
					.then(function(result) {
					  var ret = result.toJSON();
					  ret.success = true;
					  res.send(ret);
					}).catch(function(error) {
					  console.log(error);
					  res.json({success:false});
					});
				}
				else {
					console.log("Session Expired");
					res.json({success:false});
				}
			}).catch(function(error) {
			  console.log(error);
			  res.json({success:false});
			});
		}).catch(function(error) {
		  console.log(error);
		  res.json({success:false});
		});
	});
	router.route('/messages/room_id/:room_id/:timestamp/:session_id')
	.get(function(req,res){
		new Session({"session_id":req.params.session_id}).fetch({require:true}).then(function(model) {
			console.log("Session found");
			var result = check_session(Session,req.params.session_id,model.get('timestamp'))
			console.log("Result: " + result);
			if (result === true) {
				new Messages().query(function(qb)
					{
						qb.where("Room_id","=",parseInt(req.params.room_id))
						.andWhere("TimeStamp",">",req.params.timestamp)
						.orderBy("TimeStamp","asc");
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