//controller for the the /post/show page and all its different views
blog.controller( 'showPostController', function( $scope, $http, $location,
	$cookies, $window ) {

	var url = '/api/post';

	var loc = $location.absUrl();

	var basePageName = '/post/show'

	var pageIndex = loc.indexOf( basePageName );

	var params = loc.substring( pageIndex + basePageName.length );

	$scope.deletePost = function( postId ) {

		$http.delete( '/api/post/' + postId )
			.then( function( res ) {
				if ( res.status === 200 ) {
					$window.location.href = '/post/show/mine';
				} else {
					alert( res.data );
				}
			} )
			.catch( function( err ) {
				alert( err );
			} );

		return false;
	};

	if ( loc.indexOf( '/mine' ) !== -1 ) {

		//url += '/username/'+$cookies.get('username');
		url += '/mine';
	} else if ( params.length > 1 ) {
		//the condition is > 1 to avoid counting a trailing slash if it's there

		url += '/' + params;
	}

	$http.get( url )
		.then( function( res ) {

			if ( res.status === 200 ) {

				//$scope.postList = [];

				var resData = res.data;

				for ( let i = 0; i < resData.length; i++ ) {
					if ( resData[ i ].username === $cookies.get( 'username' ) )
						resData[ i ].ownPost = true;
					else
						resData[ i ].ownPost = false;
				}

				$scope.postList = resData;

				$scope.noPosts = false;
				if ( $scope.postList.length === 0 ) {
					$scope.noPosts = true;
				}
			} else {

				alert( res.data );
			}
		} )
		.catch( function( err ) {

			alert( 'Error retrieving posts from server.' );
		} );
} );
