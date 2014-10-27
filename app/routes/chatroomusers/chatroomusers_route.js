module.exports = function(router, ChatRoomUsers)
{
	//API calls for /api/chatroomusers to add and get all chatroomusers
	router.route('/chatroomusers')
	.post(function(req,res) {
		var data = ({
			"User_id":parseInt(req.body.user_id),
			"Room_id":parseInt(req.body.room_id),
		});
		console.log(data);
		new ChatRoomUsers(data).save({},{method:"insert"}).then(function(result) {
			res.send(result.toJSON());
		}).catch(function(error) {
			  console.log(error);
			  res.send('An error occured');
		});
	})

	.get(function(req,res){
		new ChatRoomUsers().fetchAll()
		.then(function(result) {
		  res.send(result.toJSON());
		}).catch(function(error) {
		  console.log(error);
		  res.send('An error occured');
		});
	});
}