/*** requirements ***/

//external
var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
//

/*** requirements ***/

mongoose.Promise = global.Promise;

var userSchema = new Schema( {
	name: String,
	username: String,
	email: String,
	password: String,
	dob: Date
} );


userSchema.index( { username: 1 }, { unique: true } );

userSchema.index( { email: 1 }, { unique: true } );

module.exports = mongoose.model( 'User', userSchema );
