var loggedMiddleware = function (req, res, next){
	if (req.user) {
		next();
	}
	else{
		res.redirect('/log-in');
	}

};

module.exports = loggedMiddleware;