

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

//configure app to use bodyParser()
// this will let us get the data from a POST

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

