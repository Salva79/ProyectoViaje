var direccion = '/api/Usuarios/' + sessionStorage.userId + '?access_token=' + sessionStorage.userToken;
var perfil;

function estilosAlerta() {
	$('#info').removeClass();
	$('#info').addClass('alert alert-danger');
}
function eliminarAlerta() {
	setTimeout(function(){
        $('#info').html("");
        $('#info').removeClass('alert alert-danger');}, 2500);
}
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

function cargaDatos(){
	$("#botonPerfil").html("<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre);
	$("#dni").val(sessionStorage.userDNI);
	$("#nombre").val(sessionStorage.userNombre);
	$("#apellidos").val(sessionStorage.userApellidos);
	$("#email").val(sessionStorage.userEmail);
	$("#curso").val(sessionStorage.userCurso);
	$("#telefono").val(sessionStorage.userTelefono);
}
function actualizaDatos(metodo,datos,url){
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: metodo,
		url: url,
	}).done(function (respuesta){
			alert(respuesta.id);
			if(typeof(respuesta.id) !== undefined){
				sessionStorage.userNombre = respuesta.Nombre;
				sessionStorage.userApellidos = respuesta.Apellidos;
				sessionStorage.userDNI = respuesta.DNI;
				sessionStorage.userTelefono = respuesta.Telefono;
				sessionStorage.userCurso = respuesta.Curso;
				sessionStorage.userusername = respuesta.username;
				sessionStorage.userEmail = respuesta.email;
				var nombre = "<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre;
				$("#botonPerfil").html(nombre);
				window.location.href = "inicio.html";
			}else{
				estilosAlerta();
				$('#info').html("No exite el usuario");
				console.log("No exite el usuario");
				nombre = "<i class='fa fa-user-circle' aria-hidden='true'></i> --- ---";
				eliminarAlerta();
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
			window.location.href = "../index.html";			
	});		
}

function recogeDatos(){
	var name = $("#nombre").val();
	var apellidos = $("#apellidos").val();
	var dni = $("#dni").val();
	var curso = $("#curso").val();
	var email = $("#email").val();
	var telefono = $("#telefono").val();
	perfil = {
	  "Nombre": name,
	  "Apellidos": apellidos,
	  "DNI": dni,
	  "Telefono": telefono,
	  "Curso": curso,
	  "username": sessionStorage.userusername,
	  "password": sessionStorage.userpassword,
	  "email": email
	}
}

$(document).ready(function() {
	cargaDatos();
	$("#botonSalir").click(function(){
		eliminarStorage();
		window.location.href = "../index.html";
	});
	$("#botonPerfil").click(function(){
		window.location.href = "perfil.html";
	});
	$("#insertar").click(function(){
		recogeDatos();
		actualizaDatos('PUT',perfil,direccion);
	});
})