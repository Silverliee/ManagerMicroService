const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const userSchema = new Schema({
	firstname: String,
	lastname: String,
	role: Number,
	email: String,
	password: String,
});

module.exports = mongoose.model('User', userSchema);
