//controller for the statistics page
blog.controller( 'statisticsController', function( $scope, $http ) {

	$http.get( '/api/statistics' )
		.then( function( res ) {

			if ( res.status === 200 ) {
				$scope.userList = res.data.userPostCount;
				$scope.topicList = res.data.topicPostCount;
			} else {
				alert( 'Error retrieving statistics!' );
			}
		} )
		.catch( function( err ) {
			alert( 'Error retrieving statistics!' );
		} )
} );
