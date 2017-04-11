module.exports = function(app) {
	console.log('---------------------------------------------------------------------------');
	console.log('\tAUTOMIGRATE definido a ' + process.env.AUTOMIGRATE);
	console.log('---------------------------------------------------------------------------');
	if(process.env.AUTOMIGRATE === 'true'){
		var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role'];
		app.dataSources.db.automigrate(lbTables, function(er) {
			if (er) throw er;
			console.log('---------------------------------------------------------------------------');
			console.log('Creadas las tablas de Loopback \n[' + lbTables + ']\n\ten ', app.dataSources.db.adapter.name);
			console.log('---------------------------------------------------------------------------');
		});
		var Tables = ['Objetivo', 'Centro', 'TipoPedido', 'Proveedor', 'Ingreso', 'Pedido', 'Producto', 'Usuario'];
		app.dataSources.db.automigrate(Tables, function(er) {
			if (er) throw er;
			console.log('---------------------------------------------------------------------------');
			console.log('Creadas las tablas\n[' + Tables + ']\n\ten ', app.dataSources.db.adapter.name);
			console.log('---------------------------------------------------------------------------');
		});
	}
}