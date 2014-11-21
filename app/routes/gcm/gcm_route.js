//API calls for /api/gcm to save registration ids
module.exports = function(router, Session, GCMDB, error_json, success_json, check_session)
{
	router.route('/gcm')
	.post(function(req,res) {
		if(req.body.session_id === undefined) {
			res.json({success:false});
			return;
		}
		if(req.body.reg_id === undefined) {
			res.json({success:false});
			return;
		}
		new Session({"session_id":req.body.session_id}).fetch({require:true}).then(function(model) {
			var result = check_session(Session,req.body.session_id,model.get('timestamp'))
			
			if (result === true) {
				var data = ({
					"reg_id":req.body.reg_id
				});
				var uid = model.get("User_id");
				data.User_id = uid;
				
				new GCMDB().save(data,{method:"insert"}).then(function(result) {
				   var message =  {};
				   message.reg_id = req.body.reg_id;
				   message.user_id = uid;
				   res.send(success_json(message));
			   }).catch(function(error) {
				   console.log(error);
				   res.json(error_json("160"));
			   });
				
			}
			else {
				console.log("Session Expired");
				res.json(error_json("103"));
			}
		})
		.catch(function(error) {
		  console.log(error);
		  res.send(error_json("101"));
		});
	});
}