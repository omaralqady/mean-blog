//controller for the login page
blog.controller( 'loginController', function( $scope, $http, $window ) {

	$scope.formInvalid = false;


	$scope.loginSubmitFn = function() {

		if ( $scope.username !== undefined && $scope.password !== undefined ) {

			$scope.formInvalid = false;

			$http.post( '/api/login', { username: $scope.username, password: $scope.password } )
				.then( function( res ) {
					if ( res.status !== 200 ) {

						alert( 'Error logging in. Please try again.' );
					} else {

						$window.location.href = res.data.redirect;
					}
				} )
				.catch( function( err ) {

					alert( 'Error sending login data to server. Please try again.' );
				} )
		} else {
			$scope.formInvalid = true;
			$scope.errorMessage = 'You must enter a username and a password!';
		}
	};
} );
