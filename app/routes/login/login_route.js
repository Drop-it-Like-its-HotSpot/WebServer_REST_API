//Route for user login
module.exports = function(router, Users, Cred, Session, knex)
{
    var bcrypt = require('bcrypt');
    var uuid = require('node-uuid');
	var error_json = require('../error/error_json');
	
    router.route('/login')
	.post(function(req,res) {
		if(req.body.password === undefined) {
			res.json({missing_parameter:"password",success:false});
			return;
		}
		if(req.body.email_id === undefined) {
			res.json({missing_parameter:"email_id",success:false});
			return;
		}
		var data = ({
			"Email_id":req.body.email_id,
		});
		
		new Users(data).fetch({require:true}).then(function(model) {
			var uid = model.get("User_id");
			console.log(uid);
			var sessionid = uuid.v4();
			new Cred({"User_id":uid}).fetch({require:true}).then(function(model) {
				var password = model.get("Password").trim();
				bcrypt.compare(req.body.password.trim(), password, function(error, response) {
				   if(response === true){
						var raw = '"User_id" = ' + uid + ' AND  EXTRACT(epoch from now() - "timestamp")/3600 > 1';
						knex('session').whereRaw(raw).del()
						.then(function(result) {
							console.log(result);
						}).catch(function(error) {
							console.log(error);
						});
						new Session().save({"User_id":uid,"session_id":sessionid},{method:"insert"}).then(function(result) {
							var message =  {};
							message.success = true;
							message.session_id = sessionid;
							message.user_id = uid;
							res.send(message);
						}).catch(function(error) {
							console.log(error);
							res.send(error_json("100"));
						});
				   }
					else{
						console.log(response);
						res.send(error_json("102"));
				   }
				});
			}).catch(function(error) {
				console.log(error);
				res.send(error_json("101"));
			});
		}).catch(function(error) {
			console.log(error);
			res.send(error_json("111"));
		});
	});
};