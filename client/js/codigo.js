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