var direccion = '/api/Usuarios/' + sessionStorage.userId + '?access_token=' + sessionStorage.userToken;

function eliminarStorage(){ 
	sessionStorage.removeItem("Nombre");
	sessionStorage.removeItem("username"); 
}
function vaciarCampos() {
	$("#nombre").val("");
}
function estilosAlerta() {
	$('#info').removeClass();
	$('#info').addClass('alert alert-danger');
}
function eliminarAlerta() {
	setTimeout(function() {
		$('#info').html("");
		$('#info').removeClass('alert alert-danger');
	}, 2500);
}
function conexion(envio, url) {
	$.ajax({
		async: true,
		dataType: 'json',
		data: envio,
		method: 'POST',
		url: url,
	}).done(function(respuesta) {
		if (typeof(respuesta.id) !== undefined) {
			sessionStorage.Nombre = respuesta.Nombre;
			sessionStorage.Username = respuesta.username;
		} else {
			alert("No exite el usuario");
		}
	}).fail(function(xhr) {
		if (xhr.statusText === 'Unauthorized') {
			alert('Error, usuario no registrado');
		} else {
			alert('Error en el envio de datos');
		}
		eliminarStorage();
		window.location.href = "../../index.html";
	});
}
function validarDatos() {
	var error = "";
	var correcto = true;

	var nombre = $("#nombre").val("");

	nombre = nombre.trim();

	if (nombre == "") {
		error = "El nombre es obligatorio";
		correcto = false;
	}

	if (correcto) {
		var envio = {
			"Nombre": nombre
		}
		var destino = '/api/TipoProductos?access_token=' + sessionStorage.userToken;
		conexion(envio, destino);
	} else {
		vaciarCampos();
		estilosAlerta();
		$('#info').html(error);
		eliminarAlerta();
	}
}

conexion('GET','',direccion);

$(document).ready(function() {
	$('#enviar').click(function() {
		validarDatos();
	});
})