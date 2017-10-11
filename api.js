// Dependencies -- packages
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Models
const Person = mongoose.model('Person');

// Create API routes
router.get('/', (req, res, next) => {
	res.json({message: "API is working"});
});

router.post('/person', (req, res, next) => {
	let name = req.body.name;
	if (!name) {
		return next(new Error("I didn't get your name."));
	}
	Person.findOne({
		name: name
	}, (err, person) => {
		if (err) {
			return next(err);
		}
		if (!person) {
			person = new Person({
				name: name
			});
			person.save((err) => {
				if (err) {
					return next(err);
				}
			})
		}
		else {
			Person.findByIdAndUpdate(person._id, {
				$inc: {'seen': 1}
			}, (err) => {
				if (err) {
					return next(err);
				}
			});
		}
	});
	res.json({message: `Hello, ${name}!`});
});

router.param('name', (req, res, next, name) => {
	Person.findOne({
		name: name
	}, (err, person) => {
		if (err) {
			return next(err);
		}
		req.person = person;
		return next();
	});
});

router.get('/person/:name', (req, res, next) => {
	if (!req.person) {
		res.json({message: `I have not seen that person yet.`});
	}
	else {
		res.json({message: `I have seen ${req.person.name} ${req.person.seen} times.`});
	}
});

module.exports = router;