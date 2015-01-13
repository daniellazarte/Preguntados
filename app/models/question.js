var mongoose = require('../connections/mongoose');
var Schema = mongoose.Schema;


var questionSchema = new Schema({
	user : {type : Schema.Types.ObjectId, ref : 'user'},
	title : {type : String},
	content : {type : String},
	slug : {type : String},
	created : {type : Date , default : Date.now}
});

var Question = mongoose.model('question', questionSchema);

module.exports = Question;