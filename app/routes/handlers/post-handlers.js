/*** requirements ***/

//external
var logger = require( 'log4js' ).getLogger();
//

//helpers
var postRetriever = require( '../../helpers/post-retriever.js' );
//

//models
var Post = require( '../../models/post.js' );
//

/*** end of requirements ***/



var postHandlers = {

	//post req on /post
	api_createPost: function( req, res, next ) {

		var postObject = {};
		var username;

		if ( req.body.title !== '' && req.body.topic !== '' && req.body.content !==
			'' ) {
			postObject.title = req.body.title;
			postObject.topic = req.body.topic;
			postObject.content = req.body.content;
		} else {
			var errMessage =
				'Incomplete data sent. Post title, topic, and content are all required!';
			res.status( 409 ).json( { message: errMessage } );
			return;
		}


		if ( req.hasOwnProperty( 'user' ) ) {

			username = req.user.username;
		} else {

			res.status( 403 ).json( { message: 'You must login first!' } );
			return;
		}

		postObject.username = username;

		var newPost = new Post( postObject );

		newPost.save( function( err, post ) {
			if ( err ) {

				if ( err.code === 11000 ) {

					res.status( 409 ).json( { message: 'You already have a post with the same title. Titles are unique per user. Either update the existing post or delete it first.' } );
				} else {

					res.status( 500 ).json( { message: 'There was an error publishing the post. Please try again.' } );
				}
			} else {

				res.redirect( '/post/show/username/' + username + '/title/' + post.title );
			}
		} );
	},

	//put req on /post
	api_updatePost: function( req, res, next ) {

		var postObject = {};
		var username;

		if ( req.body._id !== '' && req.body.title !== '' && req.body.topic !== '' &&
			req.body.content !== '' ) {

			postObject.title = req.body.title;
			postObject.topic = req.body.topic;
			postObject.content = req.body.content;
		} else {

			res.status( 409 ).json( { message: 'Incomplete data sent. Post title, topic, and content are all required!' } );
			return;
		}


		if ( req.hasOwnProperty( 'user' ) ) {

			username = req.user.username;
		} else {

			res.status( 403 ).json( { message: 'You must login first!' } );
			return;
		}

		Post.findOneAndUpdate( { _id: req.body._id, username: username }, { $set: postObject },
			function( err, data ) {

				if ( err ) {

					logger.error( 'Error updating post: ', err );
					res.status( 500 ).json( { message: 'Error updating post!' } );
				} else {

					res.status( 200 ).end();
				}
			} );
	},

	//get req on /post
	api_getAllPosts: function( req, res, next ) {

		postRetriever( {}, res );
	},

	//get req on /post/:_id
	api_getPostById: function( req, res, next ) {

		if ( req.params._id === undefined || req.params._id === null || req.params._id ===
			'mine' ) {

			return next();
		}

		postRetriever( { _id: req.params._id }, res );
	},

	//get req on /post/mine
	api_getMyPosts: function( req, res, next ) {

		if ( req.hasOwnProperty( 'user' ) ) {

			postRetriever( { username: req.user.username }, res );
		} else {

			res.status( 409 ).json( { message: 'Invalid request.' } );
		}
	},

	//get req on /post/username/:username
	api_getUserPosts: function( req, res, next ) {

		if ( req.params.username === undefined || req.params.username ===
			'undefined' ) {
			res.status( 409 ).json( { message: 'You have to send a username!' } );
			return;
		}

		postRetriever( { username: req.params.username }, res );
	},

	//get req on /post/topic/:topic
	api_getTopicPosts: function( req, res, next ) {

		if ( req.params.topic === undefined || req.params.topic === 'undefined' ) {
			res.status( 409 ).json( { message: 'You have to send a topic!' } );
			return;
		}

		postRetriever( { topic: req.params.topic }, res );
	},

	//get req on /post/username/:username/topic/:topic
	api_getSpecificPost: function( req, res, next ) {

		if ( req.params.username === undefined || req.params.username ===
			'undefined' ) {
			res.status( 409 ).json( { message: 'You have to send a username!' } );
			return;
		} else if ( req.params.title === undefined || req.params.title ===
			'undefined' ) {
			res.status( 409 ).json( { message: 'You have to send a post title!' } );
			return;
		}

		postRetriever( { username: req.params.username, title: req.params.title },
			res );
	},

	//delete req on /post/:_id
	api_RemovePost: function( req, res, next ) {

		var postId = req.params._id;
		var username = req.user.username

		Post.remove( { _id: postId, username: username }, function( err, result ) {

			if ( err ) {

				logger.error( 'Error deleting post. Err: ', err );
				res.status( 500 ).json( { message: 'Error deleting post.' } );
			} else {

				if ( result.result.n === 0 ) {

					res.status( 409 ).json( { message: 'You\'re trying to delete a post that does not exist or that belongs to another user.' } );
				} else if ( result.result.n === 1 ) {

					logger.trace( 'Result of deleting post: ', result );
					res.status( 200 ).end();
				} else {

					res.status( 500 ).json( { message: 'Error deleting post.' } );
				}
			}
		} );
	},
};

//
module.exports = postHandlers;

