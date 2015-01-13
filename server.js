var express = require('express'), 
	http = require('http'),
	swig = require('swig'),
	passport = require('passport'),
	session = require('express-session'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser');

var server = express();
var server_socket = http.createServer(server).listen(8000)
var io = require('socket.io').listen(server_socket)

swig.setDefaults({
	cache: false
});

//Configurar Express-Session
server.use(bodyParser.urlencoded({
	extended : true

}));

server.use(cookieParser());
server.use(session({
        secret: 'mi clave',
        resave: false,
        saveUninitialized: false
    }));
//server.use(session({secret : 'mi clave'}));

//Config Passport
server.use( passport.initialize());
server.use( passport.session());

//Serializando Usuario
passport.serializeUser(function (user, done){
	done(null, user); //req user

});

//Deserializando Usuario
passport.deserializeUser(function (user, done){
	done(null, user); //req user

});

//Config Swig
server.engine('html' , swig.renderFile);
server.set('view engine', 'html');
server.set('views', __dirname + '/app/views');

server.use(express.static('./public'));

//Controllers
require('./app/controllers/home')(server);
require('./app/controllers/user')(server, io);
require('./app/controllers/discuss')(server, io);

//Connection

require('./app/connections/facebook')(server);
require('./app/connections/twitter')(server);


