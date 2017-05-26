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

function conexion(metodo,datos,url){
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: metodo,
		url: url,
	}).done(function (respuesta){
			if(typeof(respuesta.id) !== undefined){
				sessionStorage.userId=respuesta.userId;
				sessionStorage.userToken=respuesta.id;
				sessionStorage.userTtl=respuesta.ttl;
				sessionStorage.userCreated=respuesta.created;
				var direccion = '/api/Usuarios/' + sessionStorage.userId + '?access_token=' + sessionStorage.userToken
				$.ajax({
				async: true,
				dataType: 'json',
				method: 'GET',
				url: direccion,
				}).done(function (respuesta){
					sessionStorage.userNombre = respuesta.Nombre;
					sessionStorage.userApellidos = respuesta.Apellidos;
					sessionStorage.userDNI = respuesta.DNI;
					sessionStorage.userTelefono = respuesta.Telefono;
					sessionStorage.userCurso = respuesta.Curso;
					sessionStorage.userusername = respuesta.username;
					sessionStorage.userEmail = respuesta.email;
					sessionStorage.userCentroId = respuesta.centroId;
					sessionStorage.userObjetivoId = respuesta.objetivo;
					switch (sessionStorage.userCurso){
						case "Coordinador":{
							window.location.href = "coordinador/inicio.html";
							break;
						}
						case "admin":{
							window.location.href = "coordinador/inicio.html";
							break;
						}
						default:{
							window.location.href = "alumnos/inicio.html";
							break;	
						}						
					}
				});					
			}else{
				vaciarCampos();
				estilosAlerta();
				$('#info').html("No exite el usuario");
				console.log("No exite el usuario");
				eliminarAlerta();
				eliminarStorage();
			}
	}).fail(function (xhr){
			if(xhr.statusText === 'Unauthorized'){
				vaciarCampos();
				estilosAlerta();
				$('#info').html("Error, usuario no registrado");
				console.log("Error, usuario no registrado");
				eliminarAlerta();
				eliminarStorage();
			}else{
				vaciarCampos();
				estilosAlerta();
				$('#info').html("Error en el envio de datos");
				console.log("Error en el envio de datos");
				eliminarAlerta();
				eliminarStorage();
			}			
	});		
}

function envio(){
	var name = $("#usuario").val();
		var pass = $("#password").val();
		if (name == "" || pass == ""){
			vaciarCampos();
			estilosAlerta();
			$('#info').html("Debes completar los campos para entrar");
			eliminarAlerta();
		}else{
			var envio = {
				"username": name,
				"password": pass
			}
			sessionStorage.userpassword = pass;
			var destino = '/api/Usuarios/login'
			conexion('POST',envio,destino);
		}
}

$(document).ready(function() {
	eliminarStorage();
	$('body').keyup(function(e){
		if(e.keyCode === 13){
			envio();
		}
	});
	$('#enviar').click(function() {
		envio();	
	});	
	$('#botonVolver').click(function() {
		window.history.back();
	});
})