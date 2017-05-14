var direccion = '/api/Usuarios/' + sessionStorage.userId + '?access_token=' + sessionStorage.userToken;
var nombre;

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
}

conexion('GET','',direccion);

function conexion(metodo,datos,url){
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: metodo,
		url: url,
	}).done(function (respuesta){
			if(typeof(respuesta.id) !== undefined){
				sessionStorage.userNombre = respuesta.Nombre;
				sessionStorage.userApellidos = respuesta.Apellidos;
				sessionStorage.userDNI = respuesta.DNI;
				sessionStorage.userTelefono = respuesta.Telefono;
				sessionStorage.userCurso = respuesta.Curso;
				sessionStorage.userusername = respuesta.username;
				sessionStorage.userEmail = respuesta.email;
				nombre = "<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre + " " + sessionStorage.userApellidos;
				$("#botonPerfil").html(nombre);
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

$(document).ready(function() {
	$("#botonSalir").click(function(){
		eliminarStorage();
		window.location.href = "../index.html";
	});
	$("#botonPerfil").click(function(){
		window.location.href = "perfil.html";
	});
})