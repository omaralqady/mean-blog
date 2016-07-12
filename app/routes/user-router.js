/*** requirements ***/

//external
var express = require( 'express' );
var router = express.Router();
//

//handlers
var userHandlers = require( './handlers/user-handlers.js' );
//

/*** end of requirements ***/


/*** routes ***/
router.post( '/register', userHandlers.register );
/*** end of routes ***/

//
module.exports = router;
