/*** requirements ***/

//external
var path = require('path');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var logger = require('log4js').getLogger();
//

//setup passport for authentication
var passportSetup = require('./app/passport-setup.js');
//

/*** requirements ***/


var init = function(express, passport) {

	logger.info('Initiating app.')

	process.on('uncaughtException', function(e) {
		logger.error('Uncaught Exception - Error: ', e);
	});

	var app = express();

	var ip = process.env.IP || '127.0.0.1';

	var port = process.env.PORT || '3000';

	var title = process.env.TITLE || 'MEAN Blog';

	if(process.env.NODE_ENV === 'heroku') {
		app.listen(port);
	} else {
		app.listen(port, ip);
	}

	app.set('title', title);

	app.locals.title = title;

	app.disable('x-powered-by');

	// view engine setup
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'pug');
	//

	//basic express modules
	app.use(morgan('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));
	//

	//auth
	passportSetup(passport);
	app.use(session({ 
		secret: 'MEAN_BLOG', //session secret
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: false
		}
	}));
	 
	app.use(passport.initialize());
	app.use(passport.session());
	//

	logger.trace('Loaded basic express middleware.');
	return app;
};

module.exports = init;