var metodoCentros = '/api/centros';

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
	$('#centro > option[value="valorInicio"]').attr('selected', 'selected');
	$("#curso").val("");
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

function obtenerCentrosDisponibles(metodo,datos,url){
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: metodo,
		url: url,
	}).done(function (respuesta){
			var cadena = '<option value="0">Selecciona el centro</option>';
			if(respuesta.length > 0){
				for(var i = 0; i < respuesta.length; i++){
					cadena = (cadena + '<option value=' + respuesta[i].id +'>' + respuesta[i].Nombre + '</option>');
				}
				$('#centros').html(cadena);				
			}
	}).fail(function (xhr){
			if(xhr.statusText === 'Unauthorized'){
				estilosAlerta();
				$('#info').html("Error, usuario no registrado");
				console.log("Error, usuario no registrado");
				eliminarAlerta();	
			}else{
				estilosAlerta();
				$('#info').html("Error en el envio de datos");
				console.log("Error en el envio de datos");
				eliminarAlerta();
			}
			eliminarStorage();
			window.location.href = "index.html";			
	});		
}

obtenerCentrosDisponibles("GET", "", "metodoCentros");

function conexion(datos, url) {
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: 'POST',
		url: url,
	}).done(function(respuesta) {
		if (typeof(respuesta.id) !== undefined) {
			/*Guardamos los datos del usuario para acceder desde otras html
			sin pasar por url, siempre se pueden codificar los datos*/
			sessionStorage.userId = respuesta.userId;
			sessionStorage.userToken = respuesta.id;
			sessionStorage.userTtl = respuesta.ttl;
			sessionStorage.userCreated = respuesta.created;

			window.location.href = "alumnos/inicio.html";
			
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

$(document).ready(function() {

	function validarDatos() {
		var error = "";
		var correcto = true;
		var patronNif = /(^([0-9]{8}[A-Z]{1})|^)$/;

		var nombre = $("#nombre").val();
		var apellidos = $("#apellidos").val();
		var nif = $("#nif").val();
		var centro = $("#centro").val();
		var curso = $("#curso").val();
		var alumno = sessionStorage.alumnoRol;
		var coordinador = sessionStorage.coordinadorRol;
		var username = sessionStorage.email;
		var email = sessionStorage.username;
		var password = sessionStorage.password;
		var fecha = new Date();
		var year = fecha.getFullYear();
		var objetivo = year + " / " + (year + 1);

		nombre = nombre.trim();
		apellidos = apellidos.trim();
		curso = curso.trim();

		if (nombre == "" || apellidos == "" || nif == "" || curso == "") {
			error = "El nombre, apellidos, nif, centro y curso son obligatorios";
			correcto = false;
		} else {
			if (!(nif.test(patronNif))) {
				error = "introduce un nif válido";
				correcto = false;
			}
		}

		if (correcto) {
			var envio = {
				"nombre": nombre,
				"apellidos": apellidos,
				"nif": nif,
				"centro": centro,
				"curso": curso,
				"username": username,
				"email": email,
				"password": password,
				"objetivo": objetivo "alumno": alumno.
				"coordinador": coordinador
			}

			var destino = '/api/Usuarios'
			conexion(envio, destino);
		} else {
			vaciarCampos();
			estilosAlerta();
			$('#info').html(error);
			eliminarAlerta();
		}
	}

	$('#enviar').click(function(e) {
		validarDatos();
	});

	$('#botonPerfil').click(function() {
		window.location = "perfil.html";
	}); 

	$('#botonVolver').click(function() {
		window.history.back();
	});
})