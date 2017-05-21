var metodoObjetivos = '/api/Objetivos';

function eliminarStorage(){
	sessionStorage.removeItem("username");
	sessionStorage.removeItem("email");
	sessionStorage.removeItem("password");
	sessionStorage.removeItem("alumnoRol");
	sessionStorage.removeItem("coordinadorRol");
}
function vaciarCampos() {
	$("#nombre").val("");
	$("#apellidos").val("");
	$("#nif").val("");
	$("#telefono").val("");
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
			window.location.href = "coordinador/altaCentro.html";
			
		} else {
			alert("No exite el usuario");
		}
	}).fail(function(xhr) {
		if (xhr.statusText === 'Unauthorized') {
			alert('Error, usuario no registrado');
		} else {
			alert('Error en el envio de datos');
		}
	});
}
function validarDatos() {
	var error = "";
	var correcto = true;
	var patronNif = /(^([0-9]{8}[A-Z]{1})|^)$/;

	var nombre = $("#nombre").val();
	var apellidos = $("#apellidos").val();
	var nif = $("#nif").val();
	var alumno = sessionStorage.alumnoRol;
	var coordinador = sessionStorage.coordinadorRol;
	var username = sessionStorage.email;
	var email = sessionStorage.username;
	var password = sessionStorage.password;
	var objetivo = $("#objetivo").val();
	var telefono = $("#telefono").val();

	nombre = nombre.trim();
	apellidos = apellidos.trim();
	telefono = telefono.trim();
	nif = nif.trim();

	if ((nombre == "" || apellidos == "" || nif == ""|| telefono == "")) {
		error = "El nombre, apellidos, dni y teléfono son obligatorios";
		correcto = false;
	} else {
		if (!(patronNif.test(nif))) {
			error = "introduce un nif válido";
			correcto = false;
		}
	}

	if (correcto) {
		var envio = {
			"Nombre": nombre,
			"Apellidos": apellidos,
			"DNI": nif,
			"Curso": "Coordinador",
			"username": username,
			"email": email,
			"password": password,
			"objetivo": 0,
			"Curso": 0,
			"Telefono": telefono
		}
		var destino = '/api/Usuarios';
		conexion(envio, destino);
	} else {
		vaciarCampos();
		estilosAlerta();
		$('#info').html(error);
		eliminarAlerta();
	}
}

$(document).ready(function() {
	$('#enviar').click(function() {
		validarDatos();
	});
})