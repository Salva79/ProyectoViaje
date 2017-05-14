var chalk = require('chalk');

module.exports = function(app) {
	console.log(chalk.magenta('---------------------------------------------------------------------------'));
  if(process.env.AUTOMIGRATE === 'false'){
    console.log(chalk.yellow('\tAUTOMIGRATE definido a ' + process.env.AUTOMIGRATE));
  }else if(!process.env.AUTOMIGRATE){
    console.log(chalk.yellow('\tAUTOMIGRATE no definido'));
  }else{
    console.log(chalk.yellow('\tRealizando el AUTOMIGRATE'));
  }
	console.log(chalk.magenta('---------------------------------------------------------------------------'));
	if(process.env.AUTOMIGRATE === 'true'){
		var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role'];
		app.dataSources.db.automigrate(lbTables, function(er) {
			if (er) throw er;
			console.log(chalk.magenta('---------------------------------------------------------------------------'));
			console.log(chalk.green('Creadas las tablas de Loopback \n[' + lbTables + ']\n\ten ', app.dataSources.db.adapter.name));
			console.log(chalk.magenta('---------------------------------------------------------------------------'));
		});
		var Tables = ['Objetivo', 'Centro', 'TipoProducto', 'Proveedor', 'Ingreso', 'Pedido', 'Producto', 'Usuario'];
		app.dataSources.db.automigrate(Tables, function(er) {
			if (er) throw er;
			console.log(chalk.magenta('---------------------------------------------------------------------------'));
			console.log(chalk.green('Creadas las tablas\n[' + Tables + ']\n\ten ', app.dataSources.db.adapter.name));
			console.log(chalk.magenta('---------------------------------------------------------------------------'));
		  /*Creación de Administrador*/
		  var Usuario = app.models.Usuario;
      var Role = app.models.Role;
		  var RoleMapping = app.models.RoleMapping;
		  Usuario.count(function(err, count) {
        if (err) throw err;
        if (count === 0) {
          Usuario.create([{
           	Nombre: 'admin',
           	Apellidos: 'Plataforma',
           	DNI: '00000000A',
           	Telefono: '000000000',
           	Curso: 'admin',
            username: 'admin@admin.com',
           	password: '123456',
           	email: 'admin@admin.com',
            emailVerified: true
          }], function(err, users) {
            if (err) throw err;
            console.log(chalk.green('\tUsuario Administrador Creado'));
            //Creación del Rol de Admin
            Role.create({
                name: 'admin'
            }, function(err, role) {
              if (err) throw err;
              console.log(chalk.green('\tRol Admin Creado'));
              // Asignar el rol a admin
              role.principals.create({
                  principalType: RoleMapping.USER,
                  principalId: users[0].id
              }, function(err, principal) {
                if (err) throw err;
                console.log(chalk.green('\tRol Admin Asignado'));
                console.log(chalk.magenta('---------------------------------------------------------------------------'));
              });
            });
          });
        }
      });
    });      
  }
}