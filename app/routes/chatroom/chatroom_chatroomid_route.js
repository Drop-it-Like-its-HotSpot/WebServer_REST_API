module.exports = function(router, ChatRoom)
{
	//API Call for /api/chatroom/:chat_id to get, update, and delete a specific user
	router.route('/chatroom/:chat_id')
	.get(function(req,res){
		new ChatRoom({"chat_id":parseInt(req.params.chat_id)}).fetch()
		.then(function(result) {
		  res.send(result.toJSON());
		}).catch(function(error) {
		  console.log(error);
		  res.send('An error occured');
		});
	})
	.delete(function(req,res){
		new ChatRoom({"chat_id":parseInt(req.params.chat_id)}).destroy()
		.then(function(result) {
		  res.send(result.toJSON());
		}).catch(function(error) {
		  console.log(error);
		  res.send('An error occured');
		});
	})
	.put(function(req,res){
		var data = ({});
		if(req.body.room_admin !== undefined) data.Room_Admin = parseInt(req.body.room_admin);
		if(req.body.latitude !== undefined) data.Latitude = Number(req.body.latitude);
		if(req.body.longitude !== undefined) data.Longitude = Number(req.body.longitude);
		if(req.body.chat_title !== undefined) data.Chat_title = req.body.chat_title.trim();
		if(req.body.chat_dscrpn !== undefined) data.Chat_Dscrpn = req.body.chat_dscrpn.trim();
		
		console.log(data);
		new Chat_Room({"chat_id":parseInt(req.params.chat_id)}).save(data,{patch:true})
		.then(function(result) {
		  res.send(result.toJSON());
		}).catch(function(error) {
		  console.log(error);
		  res.send('An error occured');
		});
	});
}