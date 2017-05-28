var metodoUsuario = '/api/Usuarios/' + sessionStorage.userId + '?access_token=' + sessionStorage.userToken;
var metodoAlumnos = '/api/Centros/' + sessionStorage.centroId + '/alumnos';

/* Eliminar los valores de sesión */
function eliminarStorage(){ 
	sessionStorage.removeItem("userToken");
	sessionStorage.removeItem("Nombre");
	sessionStorage.removeItem("centroId");  
}

/* Eliminar la alerta de información */
function eliminarAlerta() {
	setTimeout(function() {
		$('#info').html("");
		$('#info').removeClass();
	}, 2500);
}

/* Función para comprobar el usuario */
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
				sessionStorage.userId = respuesta.userId;
				sessionStorage.centroId = respuesta.centroId;
				var nombre = "<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre;
				$("#botonPerfil").html(nombre);
			}else{
				console.log("No exite el usuario");
			}
	}).fail(function (xhr){
			if(xhr.statusText === 'Unauthorized'){
				console.log("Error, usuario no registrado");	
			}else{
				console.log("Error en el envio de datos");
			}

			eliminarStorage();
			window.location.href = "../../index.html";			
	});		
}

conexion('GET','',metodoUsuario);

/* Función para mostrar los alumnos de un determinado centro */
function listaAlumos(datos,url) {
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: 'GET',
		url: url,
	}).done(function(respuesta) {
		var cadena = "";
		if(respuesta.length > 0){
			for(var i = 0; i < respuesta.length; i++){
				cadena = cadena + respuesta[i].DNI + ", " + respuesta[i].Nombre + ", " + respuesta[i].Apellidos +
				 " " +respuesta[i].Curso + ", " +  respuesta[i].Telefono + ", " +  respuesta[i].email +
				 '<button id="" class="botonVerificar btn btn-success" title="Verificar"><i class="fa fa-check-square-o" aria-hidden="true"></i></button>' +
				 '<button id="" class="botonEliminar btn btn-danger" title="Eliminar"><i class="fa fa-trash" aria-hidden="true"></i></button>' +
				  "<br/>";
			}
		} else {
			cadena = "No hay alumnos disponibles."
		}
		$('#contienelistados').html(cadena);
	});
}

listaAlumos('',metodoAlumnos);

$(document).ready(function() {
	$("#botonSalir").click(function(){
		eliminarStorage();
		window.location.href = "../../index.html";
	});

	$("#botonPerfil").click(function(){
		window.location.href = "../../perfil.html";
	});
})