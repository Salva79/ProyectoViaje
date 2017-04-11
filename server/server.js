'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function(){
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('\n---------------------------------------------------------------------------');
    console.log('\n\tProyecto Gestión Económica del Viaje de Estudios\n');
    console.log('\tRealizado por:');
    console.log('\t\tRubén Fernández Fernández');
    console.log('\t\tSalvador Eugenio Medina Muñoz');
    console.log('\tPara I.E.S. Dos Mares\n');
    console.log('---------------------------------------------------------------------------');
    console.log('\tIniciando Web server');
    console.log('---------------------------------------------------------------------------');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('\tWeb server escuchando en: %s', baseUrl);
    console.log('---------------------------------------------------------------------------');
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('---------------------------------------------------------------------------');
      console.log('\tNavega por tu REST API en %s%s', baseUrl, explorerPath);
    }
    console.log('---------------------------------------------------------------------------\n');
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
