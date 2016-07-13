//controller for the publish post page
blog.controller( 'publishPostController', function( $scope, $http, $window,
	$cookies ) {

	$scope.publishPostSubmitFn = function() {

		function isFormValid() {

			if ( $scope.content !== undefined && $scope.content !== '' && $scope.title !==
				undefined && $scope.title !== '' && $scope.topic !== undefined && $scope
				.topic !== '' ) {

				return true;
			} else {

				return false;
			}
		}

		var postData = {}
		postData.content = $scope.content;
		postData.title = $scope.title;
		postData.topic = $scope.topic;
		postData.private = $scope.privatePost || false;

		if ( isFormValid() ) {

			$http.post( '/api/post', postData )
				.then( function( res ) {

					if ( res.status === 200 ) {

						var newPostURL = '/post/show/username/' + $cookies.get( 'username' ) +
							'/title/' + $scope.title;
						$window.location.href = newPostURL;

					} else {

						alert( 'Error publishing post.' );
					}
				} )
				.catch( function( err ) {
					if ( err.data.message ) {

						alert( err.data.message );
					} else {
						alert( 'Error sending post data to server.' );
					}
				} );
		} else {

			alert( 'Title, topic, and post are all required fields.' );
		}
	}
} );

