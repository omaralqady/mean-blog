/*** requirements ***/

//external
var express = require( 'express' );
var router = express.Router();
//

//routers
var apiRouter = require( './api-router.js' );
var staticPostRouter = require( './static-post-router.js' );
//

//helpers
var isLoggedIn = require( '../helpers/is-logged-in.js' );
//

//handlers
var mainHandlers = require( './handlers/main-handlers.js' );
//

/*** end of requirements ***/



/*** routes ***/

router.get( '/', isLoggedIn, mainHandlers.page_getRoot );

//for all api calls
router.use( '/api', apiRouter );


//for all calls to views under /post
router.use( '/post', isLoggedIn, staticPostRouter );


//login page
router.get( '/login', mainHandlers.page_getLogin );


//logout
router.get( '/logout', mainHandlers.logout );


//statistics page
router.get( '/statistics', isLoggedIn, mainHandlers.page_getStatistics );


//user reg page
router.get( '/user/register', mainHandlers.page_userRegister );
/*** end of routes ***/

//
module.exports = router;
