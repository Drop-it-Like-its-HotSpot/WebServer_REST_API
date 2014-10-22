

// call the packages we need

var express	= require('express');
var app		= express();
var bodyParser	= require('body-parser');

var dbConfig = require('./app/config/db');
var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);

app.set('bookshelf', bookshelf);

//Creating a Model for the User Table
var Users	= bookshelf.Model.extend({
	tableName:'Users',
	idAttribute: 'User_id'
	});

//Creating a Model for the ChatRoom Table
var ChatRoom	= bookshelf.Model.extend({
	tableName:'Chat_Room',
	idAttribute: 'chat_id'
	});
	
//Creating a Model for the Chat_Room_Users Table	
var ChatRoomUsers	= bookshelf.Model.extend({
	"tableName":'Chat_Room_Users',
	"Room_id": function(){
		return this.hasOne(ChatRoom,["chat_id"])
	},
	"User_id": function(){
		return this.hasOne(Users,["User_id"])
	}
});

//Creating a Model for the Messages Table
var Messages	= bookshelf.Model.extend({
	"tableName":'Chat_Room_Users',
	"idAttribute": 'm_id',
	"Room_id": function(){
		return this.hasOne(ChatRoom,["chat_id"])
	},
	"User_id": function(){
		return this.hasOne(Users,["User_id"])
	}
});

//configure app to use bodyParser()
// this will let us get the data from a POST
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
};
 
app.use(allowCrossDomain);

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 80;

//ROUTES FOR OUR API
//==============================================
var router = express.Router();

//test route to make sure everything is working

router.use(function(req, res, next) {
	//do logging
	console.log('Something is happening.');
	next();
});


router.get('/', function(req,res){
	res.json({ message: 'horray! welcome to our api!' });
});

// more routes for our API will happen here

//API calls for /api/users to add and get all users
router.route('/users')
.post(function(req,res) {
	var data = ({
		"User_id":parseInt(req.body.user_id),
		"Email_id":req.body.email_id,
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

//API Call for /api/users/:user_id to get and update a specific user
router.route('/users/:user_id')
.get(function(req,res){
	new Users({"User_id":req.params.user_id}).fetch()
    .then(function(result) {
      res.send(result.toJSON());
    }).catch(function(error) {
      console.log(error);
      res.send('An error occured');
    });
})
.delete(function(req,res){
	new Users({"User_id":req.params.user_id}).destroy()
    .then(function(result) {
      res.send(result.toJSON());
    }).catch(function(error) {
      console.log(error);
      res.send('An error occured');
    });
})
.put(function(req,res){
	var data = ({});
	if(req.body.email_id !== undefined) data.Email_id = req.body.email_id.trim();
	if(req.body.latitude !== undefined) data.Latitude = Number(req.body.latitude);
	if(req.body.longitude !== undefined) data.Longitude = Number(req.body.longitude);
	if(req.body.displayname !== undefined) data.DisplayName = req.body.displayname.trim();
	if(req.body.radius !== undefined) data.radius = Number(req.body.radius);
	
	console.log(data);
	new Users({"User_id":req.params.user_id}).save(data,{patch:true})
    .then(function(result) {
      res.send(result.toJSON());
    }).catch(function(error) {
      console.log(error);
      res.send('An error occured');
    });
});

// REGISTER OUR ROUTES ----------
// all of our routes will be prefixed with /api

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);

