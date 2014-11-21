

// call the packages we need

var express	= require('express');
var cors 	= require('cors');
var app		= express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser	= require('body-parser');

var dbConfig = require('./app/config/db');
var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);

app.use(cors());

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

//Creating a Model for the gcm table
var GCMDB = require('./app/models/gcm_model.js')(bookshelf,Users);

var error_json = require('./error/error_json');

var success_json = require('./success/success');

var check_session = require('./session/check_session');

//configure app to use bodyParser()
// this will let us get the data from a POST
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
};
 
app.use(allowCrossDomain);

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = 8080;

//ROUTES FOR OUR API
//==============================================
var router = express.Router();

//test route to make sure everything is working

router.use(function(req, res, next) {
	//do logging
	console.log('');
	next();
});


router.get('/', function(req,res){
	res.json({ message: 'horray! welcome to our api!' });
});

// more routes for our API will happen here

//API calls for /api/login to log the user in
require('./app/routes/login/login_route')(router, Users, Cred, Session, knex, error_json, success_json);

//API calls for /api/logout to log the user out
require('./app/routes/logout/logout_route')(router, Users, Session, error_json, success_json);

//API calls for /api/users to add and get all users
require('./app/routes/user/user_route')(router, Users, Cred, Session, error_json, success_json, check_session);

//API Call for /api/users/:user_id to get, update, and delete a specific user
require('./app/routes/user/user_userid_route')(router, Users, Session, error_json, success_json, check_session);

//API Call for /api/updatelocation to update the users location
require('./app/routes/user/update_location_route')(router, Users, Session, error_json, success_json, check_session);

//API calls for /api/chatroom to add and get all chatrooms
require('./app/routes/chatroom/chatroom_route')(router, ChatRoom, Session, Users, ChatRoomUsers, knex, error_json, success_json, check_session);

//API Call for /api/chatroom/:chatroomid to get, update, and delete a specific chatroom
require('./app/routes/chatroom/chatroom_chatroomid_route')(router, ChatRoom, Session, knex, error_json, success_json, check_session);

//API Call for /api/chatroom/radius/:radius to get rooms within a specific radius
require('./app/routes/chatroom/chatroom_radius_route')(router, ChatRoom, Session, Users, ChatRoomUsers, knex, error_json, success_json, check_session);

//API calls for /api/chatroomusers to add and get all chatroomusers
require('./app/routes/chatroomusers/chatroomusers_route')(router, ChatRoomUsers, Session, error_json, success_json, check_session);

//API calls for /api/chatroomusers to get all chatroomusers for specific user_id
require('./app/routes/chatroomusers/chatroomusers_userid_route')(router, ChatRoomUsers, Session, knex, error_json, success_json, check_session);

//API calls for /api/chatroomusers to get all chatroomusers for specific room_id
require('./app/routes/chatroomusers/chatroomusers_roomid_route')(router, ChatRoomUsers, Session, error_json, success_json, check_session);

//API Call for /api/messages/messages to get, update, and delete messages
require('./app/routes/messages/messages_route')(router, Messages, Session, GCMDB, io, knex, ChatRoomUsers, error_json, success_json, check_session);

//API Call for /api/messages/messages/room_id to get messages for a specific room
require('./app/routes/messages/messages_roomid_route')(router, Messages, ChatRoomUsers, Session, io, knex, error_json, success_json, check_session);

//API Call for /api/messages/messages/user_id to get messages for a specific user
require('./app/routes/messages/messages_userid_route')(router, Messages, Session, error_json, success_json, check_session);

//API Call for /api/gcm to register gcm reg_ids with the backend
require('./app/routes/gcm/gcm_route')(router, Session, GCMDB, error_json, success_json, check_session);

//API Call for /api/gcm/send to test gcm
require('./app/routes/gcm/gcm_send_route')(router,GCMDB, knex, error_json, success_json, check_session);

// REGISTER OUR ROUTES ----------
// all of our routes will be prefixed with /api

app.use('/api', router);



http.listen(port, function(){
  console.log('listening on *:'+ port);
});

console.log('Magic happens on port ' + port);

