module.exports = function(app) {
	/*if(process.env.AUTOMIGRATE){*/
		var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role'];
		app.dataSources.db.automigrate(lbTables, function(er) {
			if (er) throw er;
			console.log('\n---------------------------------------------------------------------------');
			console.log('Creadas las tablas de Loopback \n' , lbTables , '\n\ten ', app.dataSources.db.adapter.name);
			console.log('---------------------------------------------------------------------------\n');
		});
		var Tables = ['Objetivo', 'Centro', 'TipoPedido', 'Proveedor', 'Ingreso', 'Pedido', 'Producto', 'Usuario'];
		app.dataSources.db.automigrate(Tables, function(er) {
			if (er) throw er;
			console.log('\n---------------------------------------------------------------------------');
			console.log('Creadas las tablas\n[' + Tables + ']\n\ten ', app.dataSources.db.adapter.name);
			console.log('---------------------------------------------------------------------------\n');
		});	
	/*}*/
}