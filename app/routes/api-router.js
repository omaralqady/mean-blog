/*** requirements ***/

//external
var express = require( 'express' );
var router = express.Router();
var passport = require( 'passport' );
//

//models
var db = require( '../models/db.js' );
var User = require( './../models/user.js' );
var Post = require( './../models/post.js' );
//

//helpers
var isLoggedIn = require( '../helpers/is-logged-in.js' );
//

//routers
var postRouter = require( './post-router.js' );
var userRouter = require( './user-router.js' );
//

//handlers
var apiHandlers = require( './handlers/api-handlers.js' );
//

/*** end of requirements ***/



/*** routes ***/

//login api route
router.post( '/login', passport.authenticate( 'local', { failureRedirect: '/login' } ),
	apiHandlers.api_postLogin );


//stats
router.get( '/statistics', isLoggedIn, apiHandlers.api_getStatistics );


//post api route
router.use( '/post', isLoggedIn, postRouter );


//user api route
router.use( '/user', userRouter );

/*** end of routes ***/

//
module.exports = router;
