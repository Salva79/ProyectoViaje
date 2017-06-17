var direccion = '/api/Ingresos?filter={"where":{"userId":"' + sessionStorage.userId + '"}}&access_token=' + sessionStorage.userToken;
var direccion2 = '/api/TipoProductos?access_token=' + sessionStorage.userToken;
var arrayTipos = [];

/* Eliminar los valores de sesión */
function eliminarStorage(){ 
	sessionStorage.removeItem("userToken");
	sessionStorage.removeItem("userId");
	sessionStorage.removeItem("userTtl");
	sessionStorage.removeItem("userCreated");
	sessionStorage.removeItem("userNombre");
	sessionStorage.removeItem("userApellidos");
	sessionStorage.removeItem("userDni");
	sessionStorage.removeItem("userTelefono");
	sessionStorage.removeItem("userCurso");
	sessionStorage.removeItem("userUsername");
	sessionStorage.removeItem("userEmail");
	sessionStorage.removeItem("userObjetivoId");
	sessionStorage.removeItem("userCentroId"); 
	sessionStorage.removeItem("NombreCentro"); 
	sessionStorage.removeItem("CodigoCentro");
	sessionStorage.removeItem("LocalidadCentro");
	sessionStorage.removeItem("userIdAlumnado");
	sessionStorage.removeItem("NombreObjetivo");     
}

function eliminarAlerta() {
	setTimeout(function(){
        $('#info').html("");
        $('#info').removeClass('alert alert-danger');
        $('#modalCaja').modal('toggle');
    }, 2500);
}

function obtenerTiposDisponibles(metodo,datos,url){
	$.ajax({
		async: false,
		dataType: 'json',
		data: datos,
		method: metodo,
		url: url,
	}).done(function (respuesta){
			if(respuesta.length > 0){
				for(var i = 0; i < respuesta.length; i++){
					arrayTipos[i] = respuesta[i].Nombre;
				}
			} else {
				arrayTipos[0] = "No hay categorías disponibles"
			}
	}).fail(function (xhr){
			if(xhr.statusText === 'Unauthorized'){
				console.log("Error, usuario no registrado");
			}else{
				console.log("Error, en el envio de datos");
			}

			eliminarStorage();
			window.location.href = "../../index.html";		
	});		
}

function conexion(metodo,datos,url){
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: metodo,
		url: url,
	}).done(function (respuesta){
			if(typeof(respuesta) !== undefined){
				var cadena = "<div class='listado'>";
				if(respuesta.length>0){
					for(var i = 0; i < respuesta.length; i++){
						var verify = "";
						if(respuesta[i].Verificado){
							verify = "Sí"
						}else{
							verify = "No"
						}
						cadena = cadena + (i+1) + " -   Tipo: " + arrayTipos[respuesta[i].tipo-1] + "  -  Cantidad: " + respuesta[i].Cantidad + " €<br>Verificado: " + verify + "<br>";
					}
					cadena = cadena + "</div>";
				}else{
					cadena = cadena + "No tienes ningún ingreso realizado </div>";
				}
				$('#contienelistados').html(cadena);
			}
	}).fail(function (xhr){
			if(xhr.statusText === 'Unauthorized'){
				console.log("Error, usuario no registrado");
			}else{
				console.log("Error, en el envio de datos");
			}

			eliminarStorage();
			window.location.href = "../../index.html";			
	});		
}

obtenerTiposDisponibles('GET','',direccion2);
conexion('GET','',direccion);

$(document).ready(function() {
	var nombre = ("<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre);
	$("#botonPerfil").html(nombre);
	$("#botonSalir").click(function(){
		eliminarStorage();
		window.location.href = "../../index.html";
	});
	$("#botonPerfil").click(function(){
		window.location.href = "../perfil.html";
	});
})