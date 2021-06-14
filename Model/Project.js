const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const {taskSchema} = require('./Task');

const projectSchema = new Schema({
	name: String,
	admin_id: String,
});

module.exports = mongoose.model('Project', projectSchema);