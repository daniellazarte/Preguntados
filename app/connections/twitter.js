
var passport = require('passport'),
TwitterStrategy = require('passport-twitter').Strategy;

var TwitterConnection = function (server){
	passport.use(new TwitterStrategy({
		consumerKey :'2EnjKB32i5CSwWDATz9eZtQrs',
		consumerSecret :'tNjaG8CHdvEHcvGa610LQXFNKrOt1VsXYKNaupT7J4T9ztP5XW',
		callbackURL :'http://preguntados.jit.su/auth/twitter/callback'

		}, function (accessToken, RefreshToken, profile, done){
			done(null, profile);

	}));
	server.get('/auth/twitter', passport.authenticate('twitter'));
	server.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect : '/extra-data', 
												failureRedirect : '/error'}));

	console.log('TwitterConnection ready');
};

module.exports = TwitterConnection;