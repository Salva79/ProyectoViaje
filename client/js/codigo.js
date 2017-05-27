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
				/*Guardamos los datos del usuario para acceder desde otras html
				sin pasar por url, siempre se pueden codificar los datos*/
				sessionStorage.userId=respuesta.userId;
				sessionStorage.userToken=respuesta.id;
				sessionStorage.userTtl=respuesta.ttl;
				sessionStorage.userCreated=respuesta.created;

				if (respuesta.alumnoRol == 1) {
					window.location.href = "alumnos/inicio.html";
				} else {
					window.location.href = "coordinador/inicio.html";
				}
				
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

function acceder() {
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

	$('#enviar').click(function() {
			acceder();		
	});	

	 // Controlar tecla enter
    $(document).keypress(function( event ) {
        if ( event.which == 13 ) {
          acceder();
        }
    });

	$('#botonPerfil').click(function() {
		window.location="perfil.html";
	});
	$('#botonVolver').click(function() {
		window.history.back();
	});
})