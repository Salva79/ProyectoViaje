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

/* Eliminar la alerta de información */
function eliminarAlerta() {
	setTimeout(function() {
		$('#info').html("");
		$('#info').removeClass();
		$('#modalCaja').modal('toggle');
	}, 2500);
}

/* Función para obtener los datos del centro */
function obtenerDatosCentro(datos,url) {
	$.ajax({
		async: false,
		dataType: 'json',
		data: datos,
		method: 'GET',
		url: url,
	}).done(function(respuesta) {
		if (typeof(respuesta.id) !== undefined) {
			sessionStorage.NombreCentro = respuesta.Nombre;
			sessionStorage.CodigoCentro = respuesta.CodigoCentro;
			sessionStorage.LocalidadCentro = respuesta.Localidad;
		} else {
			$('#info').html("Error, centro no encontrado");
			$('#info').addClass('alert alert-danger');
			eliminarAlerta();
		}
	}).fail(function (xhr){
			$('#info').html("Coordinador sin centro asignado");
			$('#info').addClass('alert alert-danger');
			$('#modalCaja').modal({
				show: 'true'
			});
			eliminarAlerta();			
	});
}



/* Función para mostrar los datos del centro */
function mostrarDatosCentro() {
	$("#nombre").val(sessionStorage.NombreCentro);
	$("#codigo").val(sessionStorage.CodigoCentro);
	$("#localidad").val(sessionStorage.LocalidadCentro);
}

/* Función para modificar el centro */
function modificarCentro(datos,url) {
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: 'PATCH',
		url: url,
	}).done(function(respuesta) {
		if (typeof(respuesta.id) !== undefined) {
			$('#info').addClass('alert alert-success');
			$('#info').html("Datos del centro modificados");
		} else {
			$('#info').addClass('alert alert-danger');
			$('#info').html("Error, centro no modificado");
		}
	}).fail(function (xhr){
			console.log("Error Modificar Centros");
			eliminarStorage();
			window.location.href = "../../index.html";			
	});
}

/* Función para comprobar los datos introducidos */
function validarDatos() {
	var nombre = $("#nombre").val();
	var codigo = $("#codigo").val();
	var localidad = $("#localidad").val();

	nombre = nombre.trim();
	codigo = codigo.trim();
	localidad = localidad.trim();

	if (nombre == "" || codigo == "" || localidad == "") {
		$('#info').addClass('alert alert-danger');
		$('#info').html("El nombre del centro, el código del centro y localidad son obligatorios");
	} else {
		var datosEnvio = {
			"Nombre": nombre,
			"CodigoCentro": codigo,
			"Localidad": localidad
		}
		var destino = '/api/Centros/' + sessionStorage.userCentroId + '?access_token=' + sessionStorage.userToken; 
		modificarCentro(datosEnvio, destino);
	}

		eliminarAlerta();
}

$(document).ready(function() {
	/* Mostrar el nombre del usuario conectado */
	var nombre = "<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre;
	$("#botonPerfil").html(nombre);
	var metodoObtenerDatosCentro = '/api/Centros/' + sessionStorage.userCentroId + '?access_token=' + sessionStorage.userToken; 
	obtenerDatosCentro("", metodoObtenerDatosCentro);
	mostrarDatosCentro();

	/* Salir de la aplicación */
	$("#botonSalir").click(function(){
		eliminarStorage();
		window.location.href = "../../index.html";
	});

	/* Ver información del perfil del usuario */
	$("#botonPerfil").click(function(){
		window.location.href = "../perfil.html";
	});

	$('#enviar').click(function() {
		validarDatos();
	});
})