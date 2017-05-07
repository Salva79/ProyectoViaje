function vaciarCampos() {
	$("#email").val("");
	$("#password").val("");
	$("#password1").val("");
	$('#rol > option[value="alumno"]').attr('selected', 'selected');
}

function estilosAlerta() {
	$('#info').removeClass();
	$('#info').addClass('alert alert-danger');
}

function eliminarAlerta() {
	setTimeout(function(){
        $('#info').html("");
        $('#info').removeClass('alert alert-danger');}, 2500);
}

/* PONER BIEN */
function conexion(datos,url){
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: 'POST',
		url: url,
	}).done(function (respuesta){
			if(typeof(respuesta.id) !== undefined){
				/*Guardamos los datos del usuario para acceder desde otras html
				sin pasar por url, siempre se pueden codificar los datos*/
				sessionStorage.userId=respuesta.userId;
				sessionStorage.userToken=respuesta.id;
				sessionStorage.userTtl=respuesta.ttl;
				sessionStorage.userCreated=respuesta.created;
				window.location.href = "alumnos/inicio.html";
			}else{
				alert("No exite el usuario");
			}
	}).fail(function (xhr){
			if(xhr.statusText === 'Unauthorized'){
				alert('Error, usuario no registrado');	
			}else{
				alert('Error en el envio de datos');
			}			
	});		
}

$(document).ready(function() {

	var email = $("#email").val();
	var rol = $("#rol").val();
	var password = $("#password").val();
	var password1 = $("#password1").val();

	if (email == "" || password == "" || password1 == "") {
		vaciarCampos();
		estilosAlerta();
		$('#info').html("El email y las contraseñas son obligatorios");
		eliminarAlerta();
	} else if (password != password1) {
		vaciarCampos();
		estilosAlerta();
		$('#info').html("Las contraseñas no coinciden");
		eliminarAlerta();
	} else {
		$('#insertar').click(function(e) {
			var envio = {
				"email": email,
				"rol": rol,
				"password": password,
			}

			var destino = '/api/Usuarios' /* PONER BIEN */
			conexion(envio,destino);
		});	
	}

	$('#botonPerfil').click(function() {
		window.location="perfil.html";
	});
	$('#botonVolver').click(function() {
		window.history.back();
	});
})