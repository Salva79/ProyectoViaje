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

/* Vaciar los campos, después de seleccionar el botón enviar */
function reiniciarElementos() {
	$("#nombre").val("");
}

/* Eliminar la alerta de información */
function eliminarAlerta() {
	setTimeout(function() {
		$('#info').html("");
		$('#info').removeClass();
		$('#modalCaja').modal('toggle');
	}, 2500);
}

/* Función para insertar tipo de producto */
function insertarTipoProducto(datos,url) {
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: 'POST',
		url: url,
	}).done(function(respuesta) {
		if (typeof(respuesta.id) !== undefined) {
			$('#info').html("Tipo de producto insertado");
			$('#info').addClass('alert alert-success');
		} else {
			$('#info').html("Error, tipo de producto no insertado");
			$('#info').addClass('alert alert-danger');
		}
	});
}

/* Función para comprobar los datos introducidos */
function validarDatos() {
	var nombre = $("#nombre").val("");
	nombre = nombre.trim();

	if (nombre == "") {
		$('#info').html("El nombre es obligatorio");
		$('#info').addClass('alert alert-danger');
	} else {
		var datosEnvio = {
			"Nombre": nombre
		}
		var destino = '/api/TipoProductos?access_token=' + sessionStorage.userToken; 
		insertarTipoProducto(datosEnvio, destino);
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