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
	sessionStorage.removeItem("userPassword");
	sessionStorage.removeItem("userObjetivoId");
	sessionStorage.removeItem("userCentroId"); 
	sessionStorage.removeItem("NombreCentro"); 
	sessionStorage.removeItem("CodigoCentro");
	sessionStorage.removeItem("LocalidadCentro");
	sessionStorage.removeItem("userIdAlumnado");
	sessionStorage.removeItem("NombreObjetivo");     
}

/* Vaciar los campos, después de seleccionar el botón enviar */
function reiniciarElementos() {
	$("#nombre").val("");
	$("#codigo").val("");
	$("#localidad").val("");
}

/* Eliminar la alerta de información */
function eliminarAlerta() {
	setTimeout(function() {
		$('#info').html("");
		$('#info').removeClass();
		$('#modalCaja').modal('toggle');
	}, 2500);
}

/* Función para insertar centros */
function insertarCentros(datos,url) {
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: 'POST',
		url: url,
	}).done(function(respuesta) {
		if (typeof(respuesta.id) !== undefined) {
			var datosEnvioModificarUser = {
				"Nombre": sessionStorage.userNombre,
				"Apellidos": sessionStorage.userApellidos,
				"DNI": sessionStorage.userDni,
				"Telefono": sessionStorage.userTelefono,
				"Curso": sessionStorage.userCurso,
				"username": sessionStorage.userUsername,
				"email": sessionStorage.userEmail,
				"centroId": sessionStorage.userCentroId,
				"objetivo": sessionStorage.userObjetivoId
			}

			var destinoModificarUser = '/api/Usuarios/' + sessionStorage.userId + '?access_token=' + sessionStorage.userToken; 
			modificarCentroId(datosEnvioModificarUser, destinoModificarUser);
		} else {
			$('#info').html("Error, centro no insertado");
			$('#info').addClass('alert alert-danger');
		}
	});
}

/* Función para obtener el último id de centro */
function idUltimoCentro(datos,url) {
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: 'GET',
		url: url,
	}).done(function(respuesta) {
		if (typeof(respuesta.id) !== undefined) {
			sessionStorage.userCentroId = respuesta.count;
		} else {
			$('#info').html("Error, no hay centros disponibles");
			$('#info').addClass('alert alert-danger');
		}
	});
}

/* Función modificar el centroId del usuario */
function modificarCentroId(datos,url) {
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: 'PUT',
		url: url,
	}).done(function(respuesta) {
		if (typeof(respuesta.id) !== undefined) {
			$('#info').html("Centro insertado");
			$('#info').addClass('alert alert-success');
		} else {
			$('#info').html("Error, centro no insertado");
			$('#info').addClass('alert alert-danger');
		}
	});
}

/* Función para comprobar los datos introducidos */
function validarDatos() {
	if (sessionStorage.userCentroId != null) {
		$('#info').html("El usuario ya tiene un centro");
		$('#info').addClass('alert alert-danger');
	} else {
		var nombre = $("#nombre").val();
		var codigo = $("#codigo").val();
		var localidad = $("#localidad").val();

		nombre = nombre.trim();
		codigo = codigo.trim();
		localidad = localidad.trim();

		if (nombre == "" || codigo == "" || localidad == "") {
			$('#info').html("El nombre, código del centro y localidad son obligatorios");
			$('#info').addClass('alert alert-danger');
		} else {
			var datosEnvio = {
				"Nombre": nombre,
				"CodigoCentro": codigo,
				"Localidad": localidad,
				"userId": sessionStorage.userId
			}

			var destino = '/api/Centros?access_token=' + sessionStorage.userToken; 
			insertarCentros(datosEnvio, destino);

			var destinoidUltimoCentro = '/api/Centros/count?access_token=' + sessionStorage.userToken; 
			idUltimoCentro("", destinoidUltimoCentro);
		}
	}
	
	reiniciarElementos();
	eliminarAlerta();
}

$(document).ready(function() {
	/* Mostrar el nombre del usuario conectado */
	var nombre = "<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre;
	$("#botonPerfil").html(nombre);

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