var mainHandlers = {

	//get req on '/', redirects to a page showing all posts
	page_getRoot: function( req, res, next ) {
		
		res.redirect( '/post/show' );
	},

	//get req on /login
	page_getLogin: function( req, res, next ) {

		titlePrefix = res.app.get( 'title' );
		res.render( 'login', { pageTitle: titlePrefix + ' - Login' } );
	},

	//get req on /logout
	logout: function( req, res, next ) {

		req.logout();
		res.redirect( '/' );
	},

	//get req on /statistics
	page_getStatistics: function( req, res, next ) {

		titlePrefix = res.app.get( 'title' );
		res.render( 'statistics', { pageTitle: titlePrefix + ' - Blog Statistics' } );
	},

	//get req on /user/register
	page_userRegister: function( req, res, next ) {

		titlePrefix = res.app.get( 'title' );
		res.render( 'user/register', {
			pageTitle: titlePrefix +
				' - User Registration'
		} );
	},
};

//
module.exports = mainHandlers;
