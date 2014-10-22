

// call the packages we need

var express	= require('express');
var app		= express();
var bodyParser	= require('body-parser');
var mongoose	= require('mongoose');
mongoose.connect('mongodb://admin:test@ds043190.mongolab.com:43190/mobiletest');

var dbConfig = require('./app/config/db');
var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);

app.set('bookshelf', bookshelf);
var Bear	= require('./app/models/bear');
var Users	= bookshelf.Model.extend({
	tableName:'Users',
	idAttribute: 'User_id'
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

router.route('/bears')

.post(function(req,res) {
	var bear = new Bear();
	bear.name = req.body.name;

	bear.save(function(err) {
		if(err)
			res.send(err);

		res.json({ message: 'Bear created!' });
	});
	})
.get(function(req,res){
	Bear.find(function(err, bears){
		if(err)
			res.send(err);

		res.json(bears);
	});
});

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
	var user = new Users(data);
	user.save().then(function(result) {
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

router.route('/users/:user_id')
.get(function(req,res){
	new Users({"User_id":req.params.user_id}).fetch()
    .then(function(result) {
      res.send(result.toJSON());
    }).catch(function(error) {
      console.log(error);
      res.send('An error occured');
    });
});

router.route('/bears/:bear_id')

.get(function(req,res){
	Bear.findById(req.params.bear_id, function(err, bear) {
		if(err)
			res.send(err);
		res.json(bear);
	});
})
.put(function(req,res){
	
	Bear.findById(req.params.bear_id, function(err, bear){

		if(err)
			res.send(err);

		bear.name = req.body.name;

		bear.save(function(err) {
			
			if(err)
				res.send(err);

			res.json({ message: 'Bear updated!' });
		});
	});
})

.delete(function(req, res){
	Bear.remove({
		_id: req.params.bear_id
	}, function(err, bear) {
		if(err)
			res.send(err);
		
		res.json({ message: 'Successfully deleted' });
	});

});
// REGISTER OUR ROUTES ----------
// all of our routes will be prefixed with /api

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);

