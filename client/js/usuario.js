var direccion = '/api/Usuarios/' + sessionStorage.userId + '?access_token=' + sessionStorage.userToken;
var nombre;

/* Eliminar los valores de sesión */
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
	sessionStorage.removeItem("NombreCentro"); 
	sessionStorage.removeItem("CodigoCentro");
	sessionStorage.removeItem("LocalidadCentro");
	sessionStorage.removeItem("userIdAlumnado");
	sessionStorage.removeItem("NombreObjetivo");     
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
				sessionStorage.userDni = respuesta.DNI;
				sessionStorage.userTelefono = respuesta.Telefono;
				sessionStorage.userCurso = respuesta.Curso;
				sessionStorage.userUsername = respuesta.username;
				sessionStorage.userEmail = respuesta.email;
				sessionStorage.userCentroId = respuesta.centroId;
				sessionStorage.userObjetivoId = respuesta.objetivo;
				nombre = "<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre;
				$("#botonPerfil").html(nombre);
				$("#botonPerfilAdmin").html(nombre);
				$('#mensajeInicio').html("BIENVENIDO " + sessionStorage.userNombre + " A LA APLICACIÓN DE GESTIÓN DEL VIAJE DE ESTUDIOS");
			}else{
				console.log("Error Inicio");
				eliminarStorage();
				window.location.href = "../index.html";
			}
	}).fail(function (xhr){
			console.log("Error Inicio");
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