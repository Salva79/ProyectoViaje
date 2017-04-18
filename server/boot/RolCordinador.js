module.exports = function(app) {
  var Role = app.models.Role;
  Role.registerResolver('coordinador', function(role, context, cb) {
    //El usuario debe estar logueado
    var userId = context.accessToken.userId;
    if (!userId) {
      //Si no es user devuelve un false
      return process.nextTick(() => cb(null, false));
    }
    //El usuario debe ser creador de un centro
    var centro = app.models.Centro;
      centro.count({
        verificado:true,
        userId: userId
      }, function(err, count) {
        if (err) return cb(err);
        if(count > 0){
          // Si count lo ha encontrado devuelve true, luego es "coordinador"
          return cb(null, true);
        }else{
          return cb(null, false);
        }
      });    
    });
}