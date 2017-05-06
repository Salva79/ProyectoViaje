var direccion = '/api/Usuarios/' + sessionStorage.userId + '?access_token=' + sessionStorage.userToken;
var nombre;
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
	$("#botonPerfil").html(nombre);
})