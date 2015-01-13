var passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy;

var facebookConnection = function (server) {


	passport.use(new FacebookStrategy({
		clientID : '563777047090816',
		clientSecret : 'fc111ab04d5bac0d04550fb8aa344253',
		callbackURL : 'http://preguntados.jit.su/auth/facebook/callback'
	}, function (accessToken, refreshToken, profile, done){
		done(null, profile);
	}));

	server.get('/auth/facebook', passport.authenticate('facebook'));

	server.get('/auth/facebook/callback', passport.authenticate('facebook' , { successRedirect : '/extra-data',
															failureRedirect : '/error'}));
};

module.exports = facebookConnection;