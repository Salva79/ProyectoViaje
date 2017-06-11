/* Eliminar los valores de sesión */
function eliminarStorage(){
	sessionStorage.removeItem("Username");
	sessionStorage.removeItem("Email");
	sessionStorage.removeItem("Password");
	sessionStorage.removeItem("alumnoRol");
	sessionStorage.removeItem("coordinadorRol");
}

/* Vaciar los campos, después de seleccionar el botón enviar */
function vaciarCampos() {
	$("#nombre").val("");
	$("#apellidos").val("");
	$("#nif").val("");
	$("#telefono").val("");
}

/* Eliminar la alerta de información */
function eliminarAlerta() {
	setTimeout(function() {
		$('#info').html("");
		$('#info').removeClass('alert alert-danger');
		$('#modalCaja').modal('toggle');
	}, 2500);
}

/* Función para dar de alta un usuario que sea coordinador */
function altaUsuario(envio, url) {
	$.ajax({
		async: true,
		dataType: 'json',
		data: envio,
		method: 'POST',
		url: url,
	}).done(function(respuesta) {
		if (typeof(respuesta.id) !== undefined) {
			eliminarStorage();
			window.location.href = "index.html";
		} else {
			$('#info').addClass('alert alert-danger');
			$('#info').html("No se ha podido realizar el registro del usuario");
			$('#modalCaja').modal({
				show: 'true'
			});
			eliminarAlerta();
		}
	}).fail(function(xhr) {
			if(xhr.statusText === 'Unauthorized'){
				console.log("Error, usuario no registrado");
			}else{
				console.log("Error, en el envio de datos");
			}

			eliminarStorage();
			window.location.href = "../../index.html";
	});
}

/* Función para comprobar los datos introducidos */
function validarDatos() {
	var error = "";
	var correcto = true;
	var patronNif = /(^([0-9]{8}[A-Z]{1})|^)$/;

	var nombre = $("#nombre").val();
	var apellidos = $("#apellidos").val();
	var nif = $("#nif").val();
	var username = sessionStorage.Email;
	var email = sessionStorage.Username;
	var password = sessionStorage.Password;
	var telefono = $("#telefono").val();

	nombre = nombre.trim();
	apellidos = apellidos.trim();
	telefono = telefono.trim();
	nif = nif.trim();

	if (nombre == "" || apellidos == "" || nif == ""|| telefono == "") {
		error = "El nombre, apellidos, nif y teléfono son obligatorios";
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
			"Telefono": telefono
		}
		var destino = '/api/Usuarios';
		altaUsuario(envio, destino);
	} else {
		vaciarCampos();
		$('#info').addClass('alert alert-danger');
		$('#info').html(error);
		$('#modalCaja').modal({
			show: 'true'
		});
		eliminarAlerta();
	}
}

$(document).ready(function() {
	$('#enviar').click(function() {
		validarDatos();
	});

	$('body').keyup(function(e){
		if(e.keyCode === 13){
			validarDatos();
		}
	});	
})