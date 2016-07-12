//controller for the publish post page
blog.controller( 'updatePostController', function( $scope, $http, $window,
	$cookies, $location ) {

	var getPost = function() {

		var urlData = $location.absUrl().split( '/' );
		var postId = urlData[ urlData.length - 1 ];

		$http.get( '/api/post/' + postId )
			.then( function( data ) {

				var post = data.data[ 0 ];
				$scope._id = post._id;
				$scope.title = post.title;
				$scope.content = post.content;
				$scope.topic = post.topic;
				return;
			} )
			.catch( function( err ) {
				alert( 'Error retrieving post data.' );
			} );
	};


	$scope.updatePostSubmitFn = function() {

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
		postData._id = $scope._id;
		postData.content = $scope.content;
		postData.title = $scope.title;
		postData.topic = $scope.topic;

		if ( isFormValid() ) {

			$http.put( '/api/post/' + postData._id, postData )
				.then( function( res ) {

					if ( res.status === 200 ) {

						var newPostURL = '/post/show/' + $scope._id;
						$window.location.href = newPostURL;

					} else {

						alert( 'Error publishing post.' );
					}
				} )
				.catch( function( err ) {

					alert( 'Error sending post data to server.' );
				} );
		} else {

			alert( 'Title, topic, and post are all required fields.' );
		}
	}

	getPost();
} );
