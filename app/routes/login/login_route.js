//Route for user login
module.exports = function(router, Users, Cred, Session)
{
    var bcrypt = require('bcrypt');
    var uuid = require('node-uuid');
    router.route('/login')
        .post(function(req,res) {
            var data = ({
                "Email_id":req.body.email_id,
            });
            console.log(data);
            new Users(data).fetch({require:true}).then(function(model) {
                var uid = model.get("User_id");
                var sessionid = uuid.v1();
                new Cred({"User_id":uid}).fetch({require:true}).then(function(model) {
                    var password = model.get("Password");
                    bcrypt.compare(req.body.password, hash, function(err, res) {
                       if(res){
                           new Session().save({"User_id":uid,"session_id":sessionid},{method:"insert"}).then(function(result) {
                                res.send({"session_id":sessionid});
                           }).catch(function(error) {
                               console.log(error);
                               res.send('An error occured');
                           });
                       }
                        else{
                           console.log(error);
                           res.send('An error occured');
                       }
                    });
                }).catch(function(error) {
                    console.log(error);
                    res.send('An error occured');
                });
            }).catch(function(error) {
                console.log(error);
                res.send('An error occured');
            });
        });
};