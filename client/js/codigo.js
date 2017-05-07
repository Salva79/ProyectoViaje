function vaciarCampos() {
	$("#usuario").val("");
	$("#password").val("");
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
				vaciarCampos();
				estilosAlerta();
				$('#info').html("No exite el usuario");
				console.log("No exite el usuario");
				eliminarAlerta();
			}
	}).fail(function (xhr){
			if(xhr.statusText === 'Unauthorized'){
				vaciarCampos();
				estilosAlerta();
				$('#info').html("Error, usuario no registrado");
				console.log("Error, usuario no registrado");
				eliminarAlerta();
			}else{
				vaciarCampos();
				estilosAlerta();
				$('#info').html("Error en el envio de datos");
				console.log("Error en el envio de datos");
				eliminarAlerta();
			}			
	});		
}

$(document).ready(function() {
	$('#enviar').click(function(e) {
		var envio = {
			"username": $("#usuario").val(),
			"password": $("#password").val()
		}
		var destino = '/api/Usuarios/login'
		conexion(envio,destino);
	});	
	$('#botonPerfil').click(function() {
		window.location="perfil.html";
	});
	$('#botonVolver').click(function() {
		window.history.back();
	});
})