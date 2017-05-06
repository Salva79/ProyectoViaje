module.exports = function(Centro) {
	var chalk = require('chalk');
	return function(req,res,next){
		res.redirect('/errores/error404.html');
	}
};