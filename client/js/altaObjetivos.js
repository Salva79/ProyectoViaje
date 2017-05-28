function estilosinfo() {
	$('#info').removeClass();
	$('#info').addClass('alert alert-success');
}
function eliminarinfo() {
	setTimeout(function(){
        $('#info').html("");
        $('#info').removeClass('alert alert-success');}, 2500);
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

/* Vaciar los campos, después de seleccionar el botón enviar */
function reiniciarElementos() {
	$("#nombre").val("");
	$("#inicio").val("");
	$("#fin").val("");
}

function estilosAlerta() {
	$('#info').removeClass();
	$('#info').addClass('alert alert-danger');
}

/* Eliminar la alerta de información */
function eliminarAlerta() {
	setTimeout(function() {
		$('#info').html("");
		$('#info').removeClass();
	}, 2500);
}

/* Función para insertar proveedores */
function insertarObjetivo(datos,url) {
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: 'POST',
		url: url,
	}).done(function(respuesta) {
		if (typeof(respuesta.id) !== undefined) {
			estilosinfo();
			$('#info').html("Objetivo insertado");
			eliminarinfo();
			window.location.href = "../inicio.html";
			
		} else {
			estilosAlerta();
			$('#info').html("Error, objetivo no insertado");
			eliminarAlerta();
		}
	});
}

/* Función para comprobar los datos introducidos */
function validarDatos() {
	var nombre = $("#nombre").val();
	var inicio = $("#inicio").val();
	var fin = $("#fin").val();
	nombre = nombre.trim();
	inicio = inicio.trim();
	fin = fin.trim();
	if (nombre == "" || inicio == "" || fin == "") {
		estilosAlerta();
		$('#info').html("El nombre y las fechas son obligatorios");
		eliminarAlerta();
	} else {
		var datosEnvio = {
			"YearInicio": inicio,
  			"YearFin": fin,
  			"usuarioId": sessionStorage.userId,
			"Nombre": nombre
		}
		var destino = '/api/Objetivos?access_token=' + sessionStorage.userToken;
		insertarObjetivo(datosEnvio, destino);
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
		window.location.href = "../perfil.html";
	});

	$('#insertar').click(function() {
		validarDatos();
	});
})