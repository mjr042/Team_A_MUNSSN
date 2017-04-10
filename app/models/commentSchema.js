// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var commentSchema = new Schema({
	username: {type: String, required: true, unique: true},
	parent: {type: String},
	comHistory: {type: Array, default: []}, //array of past versions of the comment, users should be able to navigate through them once fully implemented
	commentIterator: {type: Number, default: 1 }
});

// the schema is useless so far
// we need to create a model using it
var Comment = mongoose.model('Comment', commentSchema);

// make this available to our users in our Node applications
module.exports = Comment;
