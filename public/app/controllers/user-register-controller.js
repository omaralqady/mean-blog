//controller for user reg page
blog.controller( 'userRegistrationController', function( $scope, $http, $window ) {

	$scope.validationError = false;

	function isFormValid( userData ) {

		var errorMessage;

		$scope.validationError = false;

		if ( userData.name === undefined || userData.name.length < 4 ) {
			errorMessage = 'Name is less than 4 characters long';
		} else if ( userData.username === undefined || userData.username.length < 4 ) {
			errorMessage = 'Username is less than 4 characters long';
		} else if ( userData.password === undefined || userData.password.length < 4 ) {
			errorMessage = 'Password is less than 4 characters long';
		} else if ( userData.confirmPassword === undefined || userData.confirmPassword !==
			userData.password ) {
			errorMessage = 'Password and Confirm Password do not match';
		} else if ( userData.email === undefined ) {
			errorMessage = 'You must enter your email';
		} else if ( userData.confirmEmail !== userData.email ) {
			errorMessage = 'Email and Confirm Email do not match';
		} else if ( userData.dob == undefined || userData.dob === null ) {
			errorMessage = 'You must enter your date of birth';
		} else {
			return true;
		}

		//in case an error has been detected above, otherwise, 'true' is returned in the 'else' 
		// clause to denote validity
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
