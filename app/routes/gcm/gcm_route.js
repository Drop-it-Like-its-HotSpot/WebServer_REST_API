//API calls for /api/gcm to save registration ids
module.exports = function(router, Session, GCMDB)
{
	var check_session = require('../session/check_session');
	
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
				   message.success = true;
				   message.reg_id = req.body.reg_id;
				   message.user_id = uid;
				   res.send(message);
			   }).catch(function(error) {
				   console.log(error);
				   res.json({success:false});
			   });
				
			}
			else {
				console.log("Session Expired");
				res.json({success:false,
						  message:'Session Expired'});
			}
		})
		.catch(function(error) {
		  console.log(error);
		  res.send('An error occured');
		});
	});
}