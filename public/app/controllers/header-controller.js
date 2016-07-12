//controller for the header section for all pages
blog.controller( 'headerController', function( $scope, $cookies ) {

	if ( $cookies.get( 'connect.sid' ) !== undefined && $cookies.get(
			'connect.sid' ) !== null && $cookies.get( 'username' ) !== undefined &&
		$cookies.get( 'username' ) !== null ) {

		$scope.isLoggedIn = true;
	} else {

		$scope.isLoggedIn = false;
	}
} );
