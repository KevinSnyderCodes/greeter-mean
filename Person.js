const mongoose = require('mongoose');

var PersonSchema = new mongoose.Schema({
	name: String,
	seen: {type: Number, default: 1}
});

mongoose.model('Person', PersonSchema);