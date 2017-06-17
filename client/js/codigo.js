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
}
 
function vaciarCampos() {
	$("#usuario").val("");
	$("#password").val("");
}

function eliminarAlerta() {
	setTimeout(function(){
        $('#info').html("");
        $('#info').removeClass();
    	$('#modalCaja').modal('toggle');}, 2500);
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
					sessionStorage.userDni = respuesta.DNI;
					sessionStorage.userTelefono = respuesta.Telefono;
					sessionStorage.userCurso = respuesta.Curso;
					sessionStorage.userUsername = respuesta.username;
					sessionStorage.userEmail = respuesta.email;
					sessionStorage.userCentroId = respuesta.centroId;
					sessionStorage.userObjetivoId = respuesta.objetivo;
					switch (sessionStorage.userCurso){
						case "Coordinador":{
							window.location.href = "coordinador/inicio.html";
							break;
						}
						case "admin":{
							window.location.href = "admin/inicio.html";
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
				$('#info').addClass('alert alert-danger');
				$('#info').html("No exite el usuario");
				console.log("No exite el usuario");
				$('#modalCaja').modal({
					show: 'true'
				});
				
				eliminarAlerta();
			}
	}).fail(function (xhr){
			if(xhr.statusText === 'Unauthorized'){
				vaciarCampos();
				$('#info').addClass('alert alert-danger');
				$('#info').html("Error, usuario no registrado");
				console.log("Error, usuario no registrado");
			}else{
				vaciarCampos();
				$('#info').addClass('alert alert-danger');
				$('#info').html("Error en el envio de datos");
				console.log("Error en el envio de datos");
			}

			$('#modalCaja').modal({
				show: 'true'
			});
			
			eliminarAlerta();			
	});
		
	eliminarStorage();	
}

function envio(){
	var name = $("#usuario").val();
	var pass = $("#password").val();
	if (name == "" || pass == ""){
		vaciarCampos();
		$('#info').addClass('alert alert-danger');
		$('#info').html("Debes completar los campos para entrar");
		$('#modalCaja').modal({
		    show: 'true'
		});
		eliminarAlerta();
	}else{
		var envio = {
			"username": name,
			"password": pass
		}
		var destino = '/api/Usuarios/login';
		conexion('POST',envio,destino);
	}
}

$(document).ready(function() {
	eliminarStorage();
	$('#enviar').click(function() {
		envio();		
	});
	$('body').keyup(function(e){
		if(e.keyCode === 13){
			envio();
		}
	});
	$('#botonVolver').click(function() {
		window.history.back();
	});
})