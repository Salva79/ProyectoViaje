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
	sessionStorage.removeItem("userObjetivo");
	sessionStorage.removeItem("userCetro"); 
}

/* Eliminar la alerta de información */
function eliminarAlerta() {
	setTimeout(function() {
		$('#info').html("");
		$('#info').removeClass();
	}, 2500);
}

/* Vaciar los campos, después de seleccionar el botón enviar */
function reiniciarElementos() {
	$("#nombre").val("");
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

/* Función para insertar categorías */
function insertarCategoria(datos,url) {
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: 'POST',
		url: url,
	}).done(function(respuesta) {
		if (typeof(respuesta.id) !== undefined) {
			$('#info').addClass('alert alert-success');
			$('#info').html("Categoria insertada");		
		} else {
			$('#info').addClass('alert alert-danger');
			$('#info').html("Error, categoria no insertada");
		}
	});
}

/* Función para comprobar los datos introducidos */
function validarDatos() {
	var nombre = $("#nombre").val();
	nombre = nombre.trim();

	if (nombre == "") {
		$('#info').html("El nombre es obligatorio");
		$('#info').addClass('alert alert-danger');
	} else {
		var datosEnvio = {
			"Nombre": nombre
		}

		var destino = '/api/TipoProductos?access_token=' + sessionStorage.userToken;
		insertarCategoria(datosEnvio, destino);
	}
		reiniciarElementos();
		eliminarAlerta();
}

$(document).ready(function() {
	var nombre = "<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre;
	$("#botonPerfil").html(nombre);

	$("#botonSalir").click(function(){
		eliminarStorage();
		window.location.href = "../../index.html";
	});

	$("#botonPerfil").click(function(){
		window.location.href = "../../perfil.html";
	});

	$('#insertar').click(function() {
		validarDatos();
	});
})