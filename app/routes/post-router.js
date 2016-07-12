/*** requirements ***/

//external
var express = require( 'express' );
var router = express.Router();
//

//post route handlers
var postHandlers = require( './handlers/post-handlers.js' );
//


/*** end of requirements ***/



/*** routes ***/

//post route for publishing a new post
router.post( '/', postHandlers.api_createPost );

//update
router.put( '/:_id', postHandlers.api_updatePost );

//delete post
router.delete( '/:_id', postHandlers.api_RemovePost );

//retrieves all available posts
router.get( '/', postHandlers.api_getAllPosts );

//get post by id
router.get( '/:_id', postHandlers.api_getPostById );

//user's own posts
router.get( '/mine', postHandlers.api_getMyPosts );

//retrieves all posts by a certain user
router.get( '/username/:username', postHandlers.api_getUserPosts );

//retrieves all posts in a certain topic
router.get( '/topic/:topic', postHandlers.api_getTopicPosts );

//retrieves a certain post 
//titles are unique per user, so the combination of user & title refers to a unique post
router.get( '/username/:username/title/:title', postHandlers.api_getSpecificPost );

/*** end of routes ***/

//
module.exports = router;
