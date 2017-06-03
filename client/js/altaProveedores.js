var metodoUsuario = '/api/Usuarios/' + sessionStorage.userId + '?access_token=' + sessionStorage.userToken;

/* Eliminar la alerta de información */
function eliminarAlerta() {
	setTimeout(function() {
		$('#info').html("");
		$('#info').removeClass();
	}, 2500);
}

/* Vaciar los campos, después de seleccionar el botón enviar */
function reiniciarElementos() {
	$("#nombre").val("");
}

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
	sessionStorage.removeItem("userCetro");
}

/* Función para insertar proveedores */
function insertarProveedor(datos,url) {
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: 'POST',
		url: url,
	}).done(function(respuesta) {
		if (typeof(respuesta.id) !== undefined) {
			$('#info').addClass('alert alert-success');
			$('#info').html("Proveedor insertado");
		} else {
			$('#info').addClass('alert alert-danger');
			$('#info').html("Error, proveedor no insertado");
		}
	});
}

/* Función para comprobar los datos introducidos */
function validarDatos() {
	var nombre = $("#nombre").val();
	nombre = nombre.trim();
	if (nombre == "") {
		$('#info').html("El nombre es obligatorio");
		$('#info').addClass('alert alert-danger');
	} else {
		var datosEnvio = {
			"Nombre": nombre
		}
		var destino = '/api/Proveedores?access_token=' + sessionStorage.userToken;
		insertarProveedor(datosEnvio, destino);
	}
		reiniciarElementos();
		eliminarAlerta();
}

$(document).ready(function() {
	var nombre = "<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre;
	$("#botonPerfil").html(nombre);
	$("#botonSalir").click(function(){
		eliminarStorage();
		window.location.href = "../../index.html";
	});

	$("#botonPerfil").click(function(){
		window.location.href = "../../perfil.html";
	});

	$('#insertar').click(function() {
		validarDatos();
	});
})