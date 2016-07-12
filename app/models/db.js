/*** requirements ***/

//external
var mongoose = require( 'mongoose' );
var logger = require( 'log4js' ).getLogger();
//

/*** end of requirements ***/


//replace mongoose's promise with JS native promise
mongoose.Promise = global.Promise;

//read DBName from app env if it exists
var dbName = process.env.DBName || 'blog';

//read db host from app env if it exists
var dbStr = process.env.DBHost || 'mongodb://localhost/';

var fullDBStr = dbStr + dbName;

var db;

//read full db conn string if it exists
if ( process.env.DBConnString !== undefined ) {

	fullDBStr = process.env.DBConnString;
}


logger.debug( 'Connecting to DB: ', fullDBStr );

db = mongoose.connect( fullDBStr, function( err ) {

	if ( err ) {

		logger.fatal(
			'CONN: Error connecting to DB. Application will terminate. Err: ', err );
		logger.trace( 'DB string: ', fullDBStr );
		process.exit( 1 );
	}
} );

mongoose.connection.once( 'open', function() {

	logger.info( 'Connected to DB successfully.' );
} );

//
module.exports = db;

