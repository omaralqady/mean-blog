/*** requirements ***/

//external
var express = require( 'express' );
var router = express.Router();
//
/*** end of requirements ***/



/*** routes ***/

//shows all posts
router.get( '/show', function( req, res, next ) {
	staticPostHandler( 'Posts', 'post/show', res );
} );

router.get( '/show/:_id', function( req, res, next ) {
	staticPostHandler( 'Posts', 'post/show', res );
} );


//all posts by a certain user
router.get( '/show/username/:username', function( req, res, next ) {
	staticPostHandler( 'Posts by ' + req.params.username, 'post/show', res );
} );


//all posts in a certain topi
router.get( '/show/topic/:topic', function( req, res, next ) {
	staticPostHandler( 'Posts - ' + req.params.topic, 'post/show', res );
} );


//a certain post by a certain user
router.get( '/show/username/:username/title/:title', function( req, res, next ) {
	staticPostHandler( 'Posts - ' + req.params.title, 'post/show', res );
} );


//shows the user a list of their own posts
router.get( '/show/mine', function( req, res, next ) {
	staticPostHandler( 'My Posts', 'post/show', res );
} );


//publish new post
router.get( '/publish', function( req, res, next ) {
	staticPostHandler( 'Publish Post', 'post/publish', res );
} );

router.get( '/update/:_id', function( req, res, next ) {
	staticPostHandler( 'Update Post', 'post/update', res );
} );

/*** end of routes ***/

/*** handler ***/
var staticPostHandler = function( title, pageName, res ) {
	var titlePrefix = res.app.get( 'title' );
	res.render( pageName, { pageTitle: titlePrefix + ' - ' + title } );
};
/*** handler ***/

//
module.exports = router;

