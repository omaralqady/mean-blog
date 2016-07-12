/*** requirements ***/

//external
var bcrypt = require( 'bcryptjs' );
var logger = require( 'log4js' ).getLogger();
var LocalStrategy = require( 'passport-local' ).Strategy;
//

//models
var User = require( './models/user.js' );
//

/*** end of requirements ***/



var passportSetup = function( passport ) {

	logger.trace( 'Setting up passport.' );

	//compares hash from db with hash from request
	function validatePassword( user, hash, password, done ) {
		bcrypt.compare( password, hash, function( err, result ) {
			if ( err ) {

				done( err );
				return;
			}

			if ( result ) {

				done( null, user );
			} else {

				done( null, false );
			}
		} );
	}

	passport.use( new LocalStrategy( function( username, password, done ) {
		User.findOne( { username: username } )
			.then( function( user ) {

				if ( user ) {

					validatePassword( user, user.password, password, done );
				} else {

					done( null, false );
				}
			} )
			.catch( function( err ) {

				done( err );
			} );
	} ) );

	/*** passport methods ***/
	passport.serializeUser( function( user, done ) {
		done( null, user.id );
	} );

	passport.deserializeUser( function( id, done ) {

		User.findById( id, function( err, user ) {
			
			done( err, user );
		} );
	} );
	/*** passport methods ***/
};

//
module.exports = passportSetup;
