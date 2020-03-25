const mongoose = require('mongoose');

const wonderSchema = new mongoose.Schema({
	name: String,
	description: String,
	country: String,
	latitude: Number,
	longitude: Number
});

const Wonder = mongoose.model('Wonder', wonderSchema);

module.exports = Wonder;
