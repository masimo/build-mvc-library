console.log('!');

var express = require('express'),
	http = require('http'),
	//path = require('path'),
	config = require('./config')(),
	app = express(),
	MongoClient = require('mongodb').MongoClient;

var Firebase = require('firebase-tools'),
	FirebaseTokenGenerator = require('firebase-token-generator');

var YOUR_FIREBASE_SECRET = 'lpUzsHkmWYkFETOpyJ7K0jVar9sMQKY60E63950t';

app.set('views', __dirname + '/templates');
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('fast-delivery-site'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({
	src: __dirname + '/public'
}));
app.use(express.static(path.join(__dirname, 'public')));



var tokenGenerator = new FirebaseTokenGenerator(YOUR_FIREBASE_SECRET);
var token = tokenGenerator.createToken({
	app_user_id: 42,
	provider: 'admin'
});


http.createServer(function(req, res) {

	var dataRef = new Firebase("https://testfirebase02.firebaseio.com/");
	// Log me in.
	dataRef.auth(token, function(error) {
		if (error) {
			console.log("Login Failed!", error);
		} else {
			console.log("Login Succeeded!");
		}
	});
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	res.end(token);

}).listen(config.port, function() {

});