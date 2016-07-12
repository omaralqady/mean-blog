/*** requirements ***/

//external
var logger = require( 'log4js' ).getLogger();
//

//db and models
var db = require( '../../models/db.js' );
var User = require( './../../models/user.js' );
var Post = require( './../../models/post.js' );
//

/*** end of requirements ***/



var apiHandlers = {
	//handles post req on /login
	api_postLogin: function( req, res, next ) {

		res.cookie( 'username', req.user.username, { path: '/' } );

		if ( req.cookies !== undefined && req.cookies.redirTo !== undefined ) {

			var pathname = req.cookies.redirTo;
			res.clearCookie( 'redirTo' );
			res.json( { redirect: pathname } );
		} else {
			res.json( { redirect: '/post/show' } );
		}
	},

	//get req on /statistics
	api_getStatistics: function( req, res, next ) {

		var data = {};

		var userPostCount = Post.aggregate( {
			$group: {
				_id: '$username',
				count: {
					$sum: 1
				}
			}
		} );

		var topicPostCount = Post.aggregate( {
			$group: {
				_id: '$topic',
				count: {
					$sum: 1
				}
			}
		} );

		// shortcuts to the promise returned by aggregate.exe()
		var upcExec = userPostCount.exec();
		var tpcExec = topicPostCount.exec();
		//

		upcExec
		.then( function( userPostCountData ) {

			data.userPostCount = userPostCountData;
			return tpcExec;
		} )
		.then( function( topicPostCountData ) {

			data.topicPostCount = topicPostCountData;
			res.json( data );
			return;
		} )
		.catch( function( err ) {
			res.status( 500 ).json( { message: 'Error retrieving statistics from DB.' } );
		} );
	},
};

//
module.exports = apiHandlers;
