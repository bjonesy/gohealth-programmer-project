const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 8000 : process.env.PORT;

const MongoClient = require('mongodb').MongoClient
const assert = require('assert');
const url = 'mongodb://bjones1985:Soccer17@ds129066.mlab.com:29066/gohealth';

// Use for POST requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// POST form submissions
app.post('/form-submissions', function(req, res) {
	
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Accept, Origin, Content-Type');
	MongoClient.connect(url, function(err, db) {
		const collection = db.collection('Emails');
		assert.equal(null, err);
		console.log("Connected correctly to server");
		collection.insertMany([
			{
				geolocation: {latitude: req.body.geolocation.latitude || null,longitude: req.body.geolocation.longitude || null},
				fName: req.body.fName || null,
				lName: req.body.lName || null,
				phone: req.body.phone || null,
				DOB: req.body.DOB || null,
				insurance: req.body.insurance || null,
				healthCarrier: req.body.healthCarrier || null,
				insuranceID: req.body.insuranceID || null
			}	
		], function(err, result) {
			if (err) {
				console.log(err);
			}
		});
		
		db.close();
	});
});

// GET form submissions
app.get('/form-posts', function(req, res) {
	MongoClient.connect(url, function(err, db) {
		const collection = db.collection('Emails');
		assert.equal(null, err);
		console.log("Connected GET");
		collection.find({}).toArray(function(err, docs) {
			console.log("Found the following records");
			res.send(docs);
		});
		db.close();
	});
});	

app.listen(port, (err) => {
	if (err) {
		// eslint-disable-next-line no-console
		console.log(err);
	}
	// eslint-disable-next-line no-console
	console.info(`Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
});