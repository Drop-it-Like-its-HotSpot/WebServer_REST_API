//API calls for /api/users to add and get all users
module.exports = function(router, Messages)
{
	router.route('/users')
	.post(function(req,res) {
		var data = ({
			"m_id":parseInt(req.body.m_id),
			"Room_id":parseInt(req.body.user_id),
			"Latitude":Number(req.body.latitude),
			"Longitude":Number(req.body.longitude),
			"DisplayName":req.body.displayname,
			"radius":Number(req.body.radius)
		});
		console.log(data);
		new Users(data).save({},{method:"insert"}).then(function(result) {
				res.send(result.toJSON());
			}).catch(function(error) {
				  console.log(error);
				  res.send('An error occured');
			});
	})
	.get(function(req,res){
		new Users().fetchAll()
		.then(function(result) {
		  res.send(result.toJSON());
		}).catch(function(error) {
		  console.log(error);
		  res.send('An error occured');
		});
	});
};