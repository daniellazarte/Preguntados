var User = require('../models/user'),
	logged = require('../middlewares/logged'),
	getuser = require('../middlewares/getuser');

var users = []
var userController = function(server, io){
	var io2 = io.of('/chat');

	io2.on('connection', function(socket){
		socket.join('chat');
		socket.on('nuevo usuario', function(data){
			socket.broadcast.to('chat').emit('devolviendo usuario', data)

		});

		socket.on('nuevo mensaje', function(data){
			io2.to('chat').emit('devolviendo mensaje', data);

		});

	});
	

	server.route('/chat')

		.get(logged, getuser, function (req, res){
			var user = {
				username : req.user.username,
				url_foto : req.user.url_foto
			}
			users.push(user);

			res.render('user/chat', {users : users, user : req.user.username, url_foto : req.user.url_foto});
		});


	server.route('/logout')

	.get(function (req, res){
		users = users.filter(function (el) {
			return el.username !== req.user.username;
		});
		io2.in('chat').emit('logout', req.user);
		req.logout();
		res.redirect('/');

	});


	server.route('/extra-data')

		.get(function (req, res) {
			User.findOne({ id_network : req.user.id }, function (err, user){
				if (user) {
					res.redirect('/');
					return;
				}
				else{
					res.render('user/extra_data');
				}
			});
			

		})

		.post(function (req, res) {
			var username = req.body.username;
			var email = req.body.email;
			if (req.user.provider == 'facebook') {
				var user = new User({
					id_network : req.user.id,
					username : username,
					email : email,
					first_name : req.user.name.givenName,
					last_name : req.user.name.familyName,
					url_foto : "http://graph.facebook.com/"+ req.user.id + "/picture",
				});
				user.save(function (err){
					if(err){
						console.log("error");
						return;
					}
				});
			}
			if (req.user.provider == 'twitter') {
				console.log("entro a twitter");
				var user = new User({
					id_network : req.user.id,
					username : username,
					email : email,
					url_foto : req.user.photos[0].value,
					//first_name : req.user.displayName,
				});
				user.save(function (err){
					if(err){
						console.log("error");
						return;
					}
				});
			}
			

			res.redirect('/');
		});
};


module.exports = userController;