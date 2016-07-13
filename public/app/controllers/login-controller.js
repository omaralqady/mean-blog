//controller for the login page
blog.controller( 'loginController', function( $scope, $http, $window, $cookies ) {

	$scope.formInvalid = false;
	$scope.loginError = false;


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

					if( err.status === 401 ) {

						$window.location.href = err.data.redirect;
					} else if ( err.data && err.data.message ) {

						alert( err.data.message );
					} else {

						alert( 'Error sending login data to server. Please try again.' );
					}
				} );
		} else {
			$scope.formInvalid = true;
			$scope.errorMessage = 'You must enter a username and a password!';
		}
	};

	$scope.onloadFn = function() {

		if( $cookies.get('loginError') !== undefined && $cookies.get('loginError') !== null && $cookies.get('loginError') !== false) {

			$scope.loginError = true;
			$scope.loginErrorMessage = 'Username and/or password are not correct!';
		} else {

			$scope.loginError = false;
		}
	};

	$scope.onloadFn();
} );

