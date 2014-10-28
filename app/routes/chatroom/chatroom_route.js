//API calls for /api/chatroom to add and get all chatrooms
module.exports = function(router, ChatRoom)
{
	router.route('/chatroom')
	.post(function(req,res) {
		var data = ({
			"Room_Admin":parseInt(req.body.room_admin),
			"Latitude":Number(req.body.latitude),
			"Longitude":Number(req.body.longitude),
			"Chat_title":req.body.chat_title,
			"Chat_Dscrpn":req.body.chat_dscrpn
		});
		console.log(data);
		new ChatRoom().save(data,{method:"insert"}).then(function(result) {
				res.send(result.toJSON());
			}).catch(function(error) {
				  console.log(error);
				  res.send('An error occured');
			});
	});
	router.route('/chatroom/:session_id')
	.get(function(req,res){
		new ChatRoom().fetchAll()
		.then(function(result) {
		  res.send(result.toJSON());
		}).catch(function(error) {
		  console.log(error);
		  res.send('An error occured');
		});
	});
}