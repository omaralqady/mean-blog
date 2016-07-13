/*
This is a helper function that retrieves posts from the DB based on a condition,
and responds with data
*/

/*** requirements ***/

//external
var logger = require( 'log4js' ).getLogger();
//

//models
var Post = require( '../models/post.js' );
//

/*** requirements ***/



var postRetriever = function( condition, req, res ) {

	logger.trace( 'PostRetriever - condition: ', condition );

	if ( condition === null ) {

		condition = {};
		condition.private = false;
	}

	

	var query = Post.find( condition ).sort( { timestamp: 1 } );

	query.select( '_id title topic content username timestamp private' );

	query.exec()
		.then( function( data ) {
			
			res.json( data );
		} )
		.catch( function( err ) {

			logger.error( 'PostRetriever - Error: ', err );
			res.render( 'error', { pageTitle: '500', message: 'There was a server retrieving the post(s). Please try again' } );
		} );
};

//
module.exports = postRetriever;

