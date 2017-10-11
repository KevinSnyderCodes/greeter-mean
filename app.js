// Dependencies -- packages
const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Models
require('./Person');

// Routes
const api = require('./api');

// Set up app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api);

// Connect to DB
mongoose.connect('mongodb://localhost:27017/db', (err, db) => {
	if (err) {
		console.log(err);
	}
	else {
		console.log("Connected to database!");
	}
});

// Create server
const port = '3000';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, function() {
	console.log(`API running on localhost:${port}`);
});

console.log("Made it to the end!");
module.exports = app;