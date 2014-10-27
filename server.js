

// call the packages we need

var express	= require('express');
var app		= express();
var bodyParser	= require('body-parser');

var dbConfig = require('./app/config/db');
var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);

app.set('bookshelf', bookshelf);

//Creating a Model for the User Table
var Users = require('./app/models/user_model.js')(bookshelf);

//Creating a Model for the ChatRoom Table
var ChatRoom = require('./app/models/chatroom_model.js')(bookshelf);
	
//Creating a Model for the Chat_Room_Users Table	
var ChatRoomUsers = require('./app/models/chatroom_users_model.js')(bookshelf,Users,ChatRoom);

//Creating a Model for the Messages Table
var Messages = require('./app/models/messages_model.js')(bookshelf,Users,ChatRoom);

//Creating a Model for the Credentials Table
var Cred = require('./app/models/credentials_model.js')(bookshelf,Users);

//Creating a Model for the session table
var Session = require('./app/models/session_model.js')(bookshelf,Users);

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
require('./app/routes/user/user_route')(router, Users, Cred);

//API Call for /api/users/:user_id to get, update, and delete a specific user
require('./app/routes/user/user_userid_route')(router, Users);

//API calls for /api/chatroom to add and get all chatrooms
require('./app/routes/chatroom/chatroom_route')(router, ChatRoom);

//API Call for /api/chatroom/:chatroomid to get, update, and delete a specific chatroom
require('./app/routes/chatroom/chatroom_chatroomid_route')(router, ChatRoom);

//API calls for /api/chatroomusers to add and get all chatroomusers
require('./app/routes/chatroomusers/chatroomusers_route')(router, ChatRoomUsers);

//API Call for /api/messages/messages to get, update, and delete messages
require('./app/routes/messages/messages_route')(router, Messages);

// REGISTER OUR ROUTES ----------
// all of our routes will be prefixed with /api

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);

