var metodoUsuario = '/api/Usuarios/' + sessionStorage.userId + '?access_token=' + sessionStorage.userToken;

/* Eliminar los valores de sesión */
function eliminarStorage(){ 
	sessionStorage.removeItem("userToken");
	sessionStorage.removeItem("userId");
	sessionStorage.removeItem("userTtl");
	sessionStorage.removeItem("userCreated");
	sessionStorage.removeItem("userNombre");
	sessionStorage.removeItem("userApellidos");
	sessionStorage.removeItem("userDNI");
	sessionStorage.removeItem("userTelefono");
	sessionStorage.removeItem("userCurso");
	sessionStorage.removeItem("userusername");
	sessionStorage.removeItem("userEmail");
	sessionStorage.removeItem("userpassword");
	sessionStorage.removeItem("userObjetivo");
	sessionStorage.removeItem("userCentro");
	sessionStorage.removeItem("NombreCentro");
	sessionStorage.removeItem("CodigoCentro");
	sessionStorage.removeItem("LocalidadCentro");
}

/* Eliminar la alerta de información */
function eliminarAlerta() {
	setTimeout(function() {
		$('#info').html("");
		$('#info').removeClass();
	}, 2500);
}

/* Función para comprobar el usuario */
function conexion(metodo,datos,url){
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: metodo,
		url: url,
	}).done(function (respuesta){
			if(typeof(respuesta.id) !== undefined){
				sessionStorage.userNombre = respuesta.Nombre;
				sessionStorage.userId = respuesta.userId;
				sessionStorage.centroId = respuesta.centroId;
				var nombre = "<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre;
				$("#botonPerfil").html(nombre);
			}else{
				console.log("No exite el usuario");
			}
	}).fail(function (xhr){
			if(xhr.statusText === 'Unauthorized'){
				console.log("Error, usuario no registrado");	
			}else{
				console.log("Error en el envio de datos");
			}

			eliminarStorage();
			window.location.href = "../../index.html";			
	});		
}

conexion('GET', '', metodoUsuario);

/* Función para modificar centros */
function obtenerDatosCentro(datos,url) {
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: 'GET',
		url: url,
	}).done(function(respuesta) {
		if (typeof(respuesta.id) !== undefined) {
			sessionStorage.NombreCentro = respuesta.Nombre;
			sessionStorage.CodigoCentro = respuesta.Nombre;
			sessionStorage.LocalidadCentro = respuesta.Localidad;
		} else {
			$('#info').html("Error, centro no encontrado");
			$('#info').addClass('alert alert-danger');
			eliminarAlerta();
		}
	});
}

var metodoObtenerDatosCentro = 'api/Centros/' + sessionStorage.centroId + '?access_token=' + sessionStorage.userToken;; 
obtenerDatosCentro("", metodoObtenerDatosCentro);

function mostrarDatosCentro() {
	$("#nombre").val(sessionStorage.NombreCentro);
	$("#codigo").val(sessionStorage.CodigoCentro);
	$("#localidad").val(sessionStorage.LocalidadCentro);
}

/* Función para modificar centros */
function modificarCentro(datos,url) {
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: 'PUT',
		url: url,
	}).done(function(respuesta) {
		if (typeof(respuesta.id) !== undefined) {
			$('#info').html("Datos del centro modificados");
			$('#info').addClass('alert alert-success');
			eliminarAlerta();
			
		} else {
			$('#info').html("Error, centro no modificado");
			$('#info').addClass('alert alert-danger');
			eliminarAlerta();
		}
	});
}

/* Función para comprobar los datos introducidos */
function validarDatos() {
	var nombre = $("#nombre").val("");
	var codigo = $("#codigo").val("");
	var localidad = $("#localidad").val("");

	nombre = nombre.trim();
	codigo = codigo.trim();
	localidad = localidad.trim();

	if (nombre == "" || codigo == "" || localidad == "") {
		$('#info').html("El nombre del centro, el código del centro y localidad son obligatorios");
		$('#info').addClass('alert alert-danger');
	} else {
		var datosEnvio = {
			"Nombre": nombre,
			"CodigoCentro": codigo,
			"Localidad": localidad,
			"userId": sessionStorage.userId
		}
		var destino = '/api/Centros/' + sessionStorage.centroId + '?access_token=' + sessionStorage.userToken; 
		modificarCentro(datosEnvio, destino);
	}

		eliminarAlerta();
}

$(document).ready(function() {
	mostrarDatosCentro();

	$("#botonSalir").click(function(){
		eliminarStorage();
		window.location.href = "../../index.html";
	});

	$("#botonPerfil").click(function(){
		window.location.href = "../../perfil.html";
	});

	$('#enviar').click(function() {
		validarDatos();
	});
})