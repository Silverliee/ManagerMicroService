const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const taskSchema = new Schema({
	name: String,
	description: String,
	state: Number,
	created_at: String,
	deadline: String,
	assigned_user_id: String,
	project_id:String
});

const taskModel = mongoose.model('Task', taskSchema);

module.exports = {
	taskSchema,
	taskModel
}
