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

	var nombre = $("#nombre").val();
	var apellidos = $("#apellidos").val();
	var nif = $("#nif").val();
	var centro = $("#centro").val();
	var curso = $("#curso").val();

	if (nombre == "" || apellidos == "" || nif == "" || centro == "" || curso == "") {
		vaciarCampos();
		estilosAlerta();
		$('#info').html("El nombre, apellidos, nif, centro y curso son obligatorios");
		eliminarAlerta();
	} else {
		$('#enviar').click(function(e) {
			var envio = {
				"nombre": nombre,
				"apellidos": apellidos,
				"nif": nif,
				"centro": centro,
				"curso": curso
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