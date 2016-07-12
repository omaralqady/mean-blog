/*** requirements ***/

//external
var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
//

/*** requirements ***/

mongoose.Promise = global.Promise;

var postSchema = new Schema( {
	timestamp: { type: Date, default: Date.now },
	username: String,
	topic: String,
	title: String,
	content: String
} );

//set the combination of username and title to be unique, so that any
//given user can have only one post per title
postSchema.index( { username: 1, title: 1 }, { unique: true } );

module.exports = mongoose.model( 'Post', postSchema );
