var chalk = require('chalk');

module.exports = function(app) {
	console.log(chalk.magenta('---------------------------------------------------------------------------'));
	console.log(chalk.yellow('\tAUTOMIGRATE definido a ' + process.env.AUTOMIGRATE));
	console.log(chalk.magenta('---------------------------------------------------------------------------'));
	if(process.env.AUTOMIGRATE === 'true'){
		var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role'];
		app.dataSources.db.automigrate(lbTables, function(er) {
			if (er) throw er;
			console.log(chalk.magenta('---------------------------------------------------------------------------'));
			console.log(chalk.yellow('Creadas las tablas de Loopback \n[' + lbTables + ']\n\ten ', app.dataSources.db.adapter.name));
			console.log(chalk.magenta('---------------------------------------------------------------------------'));
		});
		var Tables = ['Objetivo', 'Centro', 'TipoPedido', 'Proveedor', 'Ingreso', 'Pedido', 'Producto', 'Usuario'];
		app.dataSources.db.automigrate(Tables, function(er) {
			if (er) throw er;
			console.log(chalk.magenta('---------------------------------------------------------------------------'));
			console.log(chalk.yellow('Creadas las tablas\n[' + Tables + ']\n\ten ', app.dataSources.db.adapter.name));
			console.log(chalk.magenta('---------------------------------------------------------------------------'));
		});
	}
}