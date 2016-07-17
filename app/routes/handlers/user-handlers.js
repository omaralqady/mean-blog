/*** requirements ***/

//external
var logger = require( 'log4js' ).getLogger();
var bcrypt = require( 'bcryptjs' );
var Joi = require( 'joi' );
//

//models
var User = require( '../../models/user.js' );
//

/*** end of requirements ***/



var userHandlers = {

	//post req on /user/register
	register: function( req, res, next ) {

		//saves object to db
		function saveUser( userData ) {

			var newUser = new User( userData );

			newUser.save( function( err, user ) {
				if ( err ) {

					logger.debug( 'Error inserting data into DB: ', err );
					logger.trace( 'Erroneous data: ', userData );

					if ( err.code === 11000 ) {

						res.status( 409 ).json( { message: 'Duplicate username and/or email address.' } );
					} else {

						res.status( 500 ).json( { message: 'Error inserting user data into DB.' } );
					}
				} else {
					res.redirect( '/login' );
				}
			} );
		}

		//creates user data object, and hashes password using bcrypt
		function registerUser( userData ) {

			var plainPassword = userData.password;

			bcrypt.hash( plainPassword, 8, function( err, hash ) {
				if ( err ) {
					res.status( 500 ).json( { message: 'Error storing user data in DB.' } );
				} else {
					userData.password = hash;
					saveUser( userData );
				}
			} );
		}

		var userData = Object.assign( {}, req.body );

		var userSchemaJoi = Joi.object().keys( {
			name: Joi.string().trim().regex( /^([a-z\s]){4,64}$/gi ).required(),
			username: Joi.string().trim().alphanum().min( 4 ).max( 32 ).required(),
			password: Joi.string().min( 4 ).max( 32 ).required(),
			confirmPassword: Joi.string().equal( Joi.ref( 'password' ) ).required(),
			email: Joi.string().trim().email().required(),
			confirmEmail: Joi.string().trim().equal( Joi.ref( 'email' ) ).email().required(),
			dob: Joi.date().required(),
		} );

		Joi.validate( userData, userSchemaJoi, function( err, value ) {
			if ( err ) {
				var errMessage;
				logger.debug( 'Error validating user data. User data: ', value,
					'\nError: ', err );
				//res.status(409).json({message: 'Invalid user data sent.'});
				if ( err.details[ 0 ].path === 'name' ) {
					errMessage =
						'The \'Name\' field has to contain letters only, and has to be between 4 and 64 characters long.';
				} else if ( err.details[ 0 ].path === 'username' ) {
					errMessage =
						'The \'Username\' field can only contain letters and numbers, and has to be 4-32 characters long.';
				} else if ( err.details[ 0 ].path === 'password' ) {
					errMessage = 'The \'Password\' field has to be 4-32 characters long.';
				} else if ( err.details[ 0 ].path === 'confirmPassword' ) {
					errMessage =
						'The \'Confirm Password\' field has to match the \'password\'!';
				} else if ( err.details[ 0 ].path === 'email' ) {
					errMessage = 'The \'Email\' field has to be a proper email address.';
				} else if ( err.details[ 0 ].path === 'confirmEmail' ) {
					errMessage =
						'The \'Confirm Email\' field has to match the \'email\' field!';
				} else if ( err.details[ 0 ].path === 'dob' ) {
					errMessage =
						'The \'Date of birth\' field is required and has to be in the format \'mm/dd/YYY\'.';
				} else {
					errMessage = 'Form data is invalid!';
				}

				res.status( 409 ).json( { message: errMessage } );
			} else {

				//remove unnecessary fields
				delete value[ 'confirmEmail' ];
				delete value[ 'confirmPassword' ];

				registerUser( value );
			}
		} );
	},
};

module.exports = userHandlers;
