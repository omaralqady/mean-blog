//controller for user reg page
blog.controller( 'userRegistrationController', function( $scope, $http, $window ) {

	$scope.validationError = false;

	function isFormValid( userData ) {

		var errorMessage;

		$scope.validationError = false;

		if ( userData.password !== undefined && userData.password.length >= 4 ) {
			if ( userData.confirmPassword !== undefined && userData.password ===
				userData.confirmPassword ) {
				if ( userData.username !== undefined && userData.username.length >= 4 ) {
					if ( userData.email !== undefined && userData.confirmEmail !== undefined &&
						userData.email === userData.confirmEmail ) {
						if ( userData.dob !== null ) {
							return true;
						} else {
							errorMessage = 'You must enter your date of birth';
						}
					} else {
						errorMessage = 'Email and Confirm Email do not match';
					}
				} else {
					errorMessage = 'Username is less than 4 characters long';
				}

			} else {
				errorMessage = 'Password and Confirm Password do not match';
			}
		} else {
			errorMessage = 'Password is less than 4 characters long';
		}
		$scope.validationError = true;
		$scope.errorMessage = errorMessage;

		return false;
	}

	$scope.registerUserSubmitFn = function() {

		var userData = {};

		userData.username = $scope.username;
		userData.name = $scope.name;
		userData.password = $scope.password;
		userData.confirmPassword = $scope.confirmPassword;
		userData.email = $scope.email;
		userData.confirmEmail = $scope.confirmEmail;
		userData.dob = $scope.dob;

		if ( isFormValid( userData ) ) {

			$http.post( '/api/user/register', userData )
			.then( function( res ) {

				if ( res.status === 200 ) {

					$window.location.href = '/login';
				} else {
					
					alert( res.data );
				}
			} )
			.catch( function( err ) {

				if ( err.data.message ) {

					alert( err.data.message );
				} else {

					alert( 'Error sending data to server. Please try again.' );
				}
			} );
		}
	};
} );
