'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var chalk = require('chalk');

var app = module.exports = loopback();

app.start = function(){
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log(chalk.magenta('---------------------------------------------------------------------------'));
    console.log(chalk.cyan('\tProyecto Gestión Económica del Viaje de Estudios'));
    console.log(chalk.cyan('\tTutor: Alberto Sierra Olmo'));
    console.log(chalk.cyan('\tRealizado por:'));
    console.log(chalk.cyan('\t\tRubén Fernández Fernández'));
    console.log(chalk.cyan('\t\tSalvador Eugenio Medina Muñoz'));
    console.log(chalk.cyan('\tPara I.E.S. Dos Mares'));
    console.log(chalk.magenta('---------------------------------------------------------------------------'));
    console.log('\tIniciando Web server');
    console.log(chalk.magenta('---------------------------------------------------------------------------'));
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('\tWeb server escuchando en: %s', baseUrl);
    console.log(chalk.magenta('---------------------------------------------------------------------------'));
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log(chalk.magenta('---------------------------------------------------------------------------'));
      console.log('\tNavega por tu REST API en %s%s', baseUrl, explorerPath);
    }else{
      console.log('\tREST API desabilitado');
    }
    console.log(chalk.magenta('---------------------------------------------------------------------------'));
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
