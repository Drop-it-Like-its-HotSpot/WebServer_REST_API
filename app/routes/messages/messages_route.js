//API calls for /api/Messages to add and get all messages
module.exports = function(router, Messages)
{
	router.route('/messages')
	.post(function(req,res) {
		var data = ({
			"m_id":parseInt(req.body.m_id),
			"Room_id":parseInt(req.body.room_id),
			"User_id":parseInt(req.body.user_id),
			"Message":req.body.message
		});
		console.log(data);
		new Messages().save(data,{method:"insert"}).then(function(result) {
				res.send(result.toJSON());
			}).catch(function(error) {
				  console.log(error);
				  res.send('An error occured');
			});
	})
	.get(function(req,res){
		new Messages().fetchAll()
		.then(function(result) {
		  res.send(result.toJSON());
		}).catch(function(error) {
		  console.log(error);
		  res.send('An error occured');
		});
	});


	//API Call for /api/messages/:m_id to get, update, and delete a specific user
	router.route('/messages/:m_id')
	.get(function(req,res){
		new Messages({"m_id":parseInt(req.params.m_id)}).fetch()
		.then(function(result) {
		  res.send(result.toJSON());
		}).catch(function(error) {
		  console.log(error);
		  res.send('An error occured');
		});
	})
	.delete(function(req,res){
		new Messages({"m_id":parseInt(req.params.m_id)}).destroy()
		.then(function(result) {
		  res.send(result.toJSON());
		}).catch(function(error) {
		  console.log(error);
		  res.send('An error occured');
		});
	})
	.put(function(req,res){
		var data = ({});
		if(req.body.room_id !== undefined) data.Room_id = Number(req.body.room_id);
		if(req.body.user_id !== undefined) data.User_id = Number(req.body.user_id);
		if(req.body.message !== undefined) data.Message = req.body.message;
		console.log(data);
		new Messages({"m_id":parseInt(req.params.m_id)}).save(data,{patch:true})
		.then(function(result) {
		  res.send(result.toJSON());
		}).catch(function(error) {
		  console.log(error);
		  res.send('An error occured');
		});
	});
	
	//API Call for /api/messages/room_id/:room_id to get, update, and delete a specific 
	router.route('/messages/room_id/:room_id')
	.get(function(req,res){
		new Messages({"Room_id":parseInt(req.params.room_id)}).fetchAll()
		.then(function(result) {
		  res.send(result.toJSON());
		}).catch(function(error) {
		  console.log(error);
		  res.send('An error occured');
		});
	})
	
	.delete(function(req,res){
		new Messages({"Room_id":parseInt(req.params.room_id)}).destroy()
		.then(function(result) {
		  res.send(result.toJSON());
		}).catch(function(error) {
		  console.log(error);
		  res.send('An error occured');
		});
	})
	.put(function(req,res){
		var data = ({});
		if(req.body.m_id !== undefined) data.m_id = Number(req.body.m_id);
		if(req.body.user_id !== undefined) data.User_id = Number(req.body.user_id);
		if(req.body.message !== undefined) data.Message = req.body.message;
		console.log(data);
		new Messages({"Room_id":parseInt(req.params.room_id)}).save(data,{patch:true})
		.then(function(result) {
		  res.send(result.toJSON());
		}).catch(function(error) {
		  console.log(error);
		  res.send('An error occured');
		});
	});

};