

// call the packages we need

var express	= require('express');
var app		= express();
var bodyParser	= require('body-parser');

var dbConfig = require('./app/config/db');
var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);

app.set('bookshelf', bookshelf);

//Creating a Model for the User Table
var UsersCreate	= require('./app/models/user_model.js')(bookshelf);
var Users = new UsersCreate(bookshelf);

//Creating a Model for the ChatRoom Table
var ChatRoomCreate	= require('./app/models/chatroom_model.js');
var ChatRoom = new ChatRoomCreate(bookshelf);	
	
//Creating a Model for the Chat_Room_Users Table	
var ChatRoomUsersCreate	= require('./app/models/chatroom_users_model.js');
var ChatRoomUsers = new ChatRoomUsersCreate(bookshelf);

//Creating a Model for the Messages Table
var MessagesCreate	= require('./app/models/messages_model.js');
var Messages = new MessagesCreate(bookshelf);


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
require('./app/routes/user_route')(router);

//API Call for /api/users/:user_id to get, update, and delete a specific user
require('./app/routes/user_userid_route')(router);

//API calls for /api/chatroom to add and get all chatrooms
router.route('/chatroom')
.post(function(req,res) {
	var data = ({
		"chat_id":parseInt(req.body.chat_id),
		"Room_Admin":parseInt(req.body.room_admin),
		"Latitude":Number(req.body.latitude),
		"Longitude":Number(req.body.longitude),
		"Chat_title":req.body.chat_title,
		"Chat_Dscrpn":req.body.chat_dscrpn
	});
	console.log(data);
	new ChatRoom(data).save({},{method:"insert"}).then(function(result) {
			res.send(result.toJSON());
		}).catch(function(error) {
			  console.log(error);
			  res.send('An error occured');
		});
})

.get(function(req,res){
	new ChatRoom().fetchAll()
    .then(function(result) {
      res.send(result.toJSON());
    }).catch(function(error) {
      console.log(error);
      res.send('An error occured');
    });
});

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
	new ChatRoom({"chat_id":parseInt(req.params.chat_id)}).save(data,{patch:true})
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

