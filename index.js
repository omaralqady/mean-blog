/*** requirements ***/

//external
var express = require( 'express' );
var logger = require( 'log4js' ).getLogger();
var passport = require( 'passport' );
//

//init
var init = require( "./init.js" );
//

//db connection
var db = require( './app/models/db.js' );
//

//app
var mainRouter = require( './app/routes/main-router.js' );
var app;

/*** end of requirements ***/

if ( process.env.NODE_ENV === undefined ) {
	process.env.NODE_ENV = 'development';
}

if ( process.env.NODE_ENV === 'development' || process.env.NODE_ENV ===
	'heroku' ) {
	logger.setLevel( 'TRACE' );
} else {
	logger.setLevel( 'ERROR' );
}

logger.debug( 'NODE_ENV: ', process.env.NODE_ENV );


app = init( express, passport );

app.use( '/', mainRouter );

app.use( function( req, res, next ) {
	logger.debug( 'Requested non-existing page/service: ', req.originalUrl );
	if ( req.originalUrl.indexOf( '/api' ) !== -1 ) {
		res.status( 404 ).json( { message: 'Not found!' } );
	} else {
		res.render( 'error', { pageTitle: res.app.get( 'title' ) +
				' - Error - Not found!', errorTitle: 'Error - Not found!', message: 'Requested non-existing page!' } );
	}
} );
