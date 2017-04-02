module.exports = function(app) {
  if (process.env.AUTOMIGRATE) {
    var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role'];
    app.dataSources.db.automigrate(lbTables, function(er) {
      if (er) throw er;
      console.log('Loopback tables [', lbTables, '] created in ', app.dataSources.db.adapter.name);
      var institutosTables = ['Centro', 'Ingreso', 'Objetivo', 'Pedido', 'Producto', 'Proveedor', 'Tipos-Producto', 'Usuario'];
      app.dataSources.db.automigrate(institutosTables, function(er) {
        if (er) throw er;
        console.log('Loopback tables [', institutosTables, '] created in ', app.dataSources.db.adapter.name);

        var config = require('../config.local.js');
        var Usuario = app.models.Usuario;
        var Role = app.models.Role;
        var RoleMapping = app.models.RoleMapping;


        Usuario.count(function(err, count) {
          if (err) throw err;

          if (count === 0) {
            Usuario.create([{
              username: 'admin',
              apellidos: 'Plataforma',
              nombre: 'Administrador',
              email: config.admin.email,
              password: config.admin.password
            }], function(err, users) {
              if (err) throw err;

              // Create the admin role
              Role.create({
                name: 'admin'
              }, function(err, role) {
                if (err) throw err;
                console.log(role);

                // Make Bob an admin
                role.principals.create({
                  principalType: RoleMapping.USER,
                  principalId: users[0].id
                }, function(err, principal) {
                  if (err) throw err;
                  console.log(principal);
                });
              });
            });
            app.loadFixtures()
              .then(function() {
                console.log('Fixtures loaded!');
              })
              .catch(function(err) {
                console.log('Errors:', err);
              });
          }
        });
      });
    });
  }
};