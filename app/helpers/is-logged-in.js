/*** requirements ***/

//external
var logger = require( 'log4js' ).getLogger();
//

/*** end of requirements ***/


var isLoggedIn = function( req, res, next ) {

	logger.trace( 'isLoggedIn: req.originalUrl: ', req.originalUrl );

	if ( req.isAuthenticated() ) {
		return next();
	}

	if ( req.originalUrl.indexOf( '.css' ) === -1 && req.originalUrl.indexOf(
			'.js' ) === -1 && req.originalUrl.indexOf( '.less' ) === -1 && req.originalUrl
		.indexOf( '.ico' ) === -1 && req.originalUrl.indexOf( '.gif' ) === -1 && req
		.originalUrl.indexOf( '.png' ) === -1 ) {
		logger.trace( 'Setting redirTo cookie to: ', req.originalUrl );
		res.cookie( 'redirTo', req.originalUrl, { maxAge: 1000 * 60 * 5 } );
	}
	if ( req.cookies.username !== undefined ) {
		res.clearCookie( 'username' );
	}
	logger.trace( 'req.headers.accept: ', req.headers.accept );

	if ( req.headers.accept.indexOf( 'text/html' ) === -1 ) {
		res.status( 401 ).json( { message: 'You have to login first!' } );
	} else {
		res.redirect( '/login' );
	}
};

//
module.exports = isLoggedIn;
