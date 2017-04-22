module.exports = function(Centro) {
	var chalk = require('chalk');
	return function(req,res,next){
		console.log(chalk.magenta('---------------------------------------------------------------------------'));
		console.log(chalk.yellow('\t\tAtención ha ocurrido un error:'));
		console.log(chalk.red('\t\t\tError 404 - Objeto no encontrado'));
		console.log(chalk.magenta('---------------------------------------------------------------------------'));
		res.redirect('/errores/error404.html');
	}
};