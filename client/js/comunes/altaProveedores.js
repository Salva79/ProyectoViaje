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

/* Vaciar los campos, después de seleccionar el botón enviar */
function reiniciarElementos() {
	$("#nombre").val("");
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
	}).fail(function (xhr){
		console.log("Error Alta Proveedores");
		eliminarStorage();
		window.location.href = "../../index.html";			
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
	/* Mostrar el nombre del usuario conectado */
	var nombre = "<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre;
	$("#botonPerfil").html(nombre);
	$("#botonPerfilAdmin").html(nombre);

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

	$('body').keyup(function(e){
		if(e.keyCode === 13){
			validarDatos();
		}
	});
})