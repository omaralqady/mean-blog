/*** requirements ***/

//external
var logger = require('log4js').getLogger();
var bcrypt = require('bcryptjs');
var Joi = require('joi');
//

//models
var User = require('../../models/user.js');
//

/*** end of requirements ***/



var userHandlers = {

	//post req on /user/register
	register: function(req, res, next) {

		//saves object to db
		function saveUser(userData) {

			logger.trace('user data in save: ', userData);

			var newUser = new User(userData);

			newUser.save(function(err, user) {
				if(err) {
					res.status(500).json({message: 'Error inserting user data into DB.'});
				} else {
					res.redirect('/login');
				}
			});
		}

		//creates user data object, and hashes password using bcrypt
		function registerUser(userData) {

			var plainPassword = userData.password;

			bcrypt.hash(plainPassword, 8, function(err, hash) {
				if(err) {
					res.status(500).json({message: 'Error storing user data in DB.'});
				} else {
					userData.password = hash;
					saveUser(userData);
				}
			});
		}

		var userData = Object.assign({}, req.body);

		var userSchemaJoi = Joi.object().keys({
			name: Joi.string().trim().regex(/^([a-z\s]){4,64}$/gi).required(),
			username: Joi.string().trim().alphanum().min(4).max(32).required(),
			password: Joi.string().min(4).max(32).required(),
			confirmPassword: Joi.string().equal(Joi.ref('password')).required(),
			email: Joi.string().trim().email().required(),
			confirmEmail: Joi.string().trim().equal(Joi.ref('email')).email().required(),
			dob: Joi.date().required(),
		});

		Joi.validate(userData, userSchemaJoi, function(err, value) {
			if(err) {

				logger.debug('Error validating user data. User data: ', value, '\nError: ', err);
				res.status(409).json({message: 'Invalid user data sent.'});
			} else {

				//remove unnecessary fields
				delete value['confirmEmail'];
				delete value['confirmPassword'];

				logger.trace('value in /user/reg: ', value);

				registerUser(value);
			}
		});
	},
};

module.exports = userHandlers;