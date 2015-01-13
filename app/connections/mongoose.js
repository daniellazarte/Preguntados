var mongoose = require('mongoose');
//Local
//mongoose.connect('mongodb://localhost/DevAsk');

//Nodejitsu
mongoose.connect('mongodb://nodejitsu:09d9f3abafe99557846e3d409ec0eaa1@troup.mongohq.com:10056/nodejitsudb2336115185/DevAsk')

module.exports = mongoose;