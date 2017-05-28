var metodoUsuario = '/api/Usuarios/' + sessionStorage.userId + '?access_token=' + sessionStorage.userToken;

/* Eliminar los valores de sesión */
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

/* Vaciar los campos, después de seleccionar el botón enviar */
function reiniciarElementos() {
	$("#nombre").val("");
	$("#codigo").val("");
	$("#localidad").val("");
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
				sessionStorage.userId = respuesta.userId;
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

/* Función para insertar centros */
function insertarCentros(datos,url) {
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: 'POST',
		url: url,
	}).done(function(respuesta) {
		if (typeof(respuesta.id) !== undefined) {
			$('#info').html("Centro insertado");
			$('#info').addClass('alert alert-success');
			eliminarStorage();
			window.location.href = "../../index.html";
		} else {
			$('#info').html("Error, centro no insertado");
			$('#info').addClass('alert alert-danger');
		}
	});
}

/* Función para comprobar los datos introducidos */
function validarDatos() {
	var nombre = $("#nombre").val("");
	var codigo = $("#codigo").val("");
	var localidad = $("#localidad").val("");

	nombre = nombre.trim();
	codigo = codigo.trim();
	localidad = localidad.trim();

	if (nombre == "" || codigo == "" || localidad == "") {
		$('#info').html("El nombre, código del centro y localidad son obligatorios");
		$('#info').addClass('alert alert-danger');
	} else {
		var datosEnvio = {
			"Nombre": nombre,
			"CodigoCentro": codigo,
			"Localidad": localidad,
			"userId": sessionStorage.id
		}
		var destino = '/api/Centros?access_token=' + sessionStorage.userToken; 
		insertarCentros(datosEnvio, destino);
	}

		reiniciarElementos();
		eliminarAlerta();
}

$(document).ready(function() {
	$('#enviar').click(function() {
		validarDatos();
	});
})