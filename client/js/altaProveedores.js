var metodoUsuario = '/api/Usuarios/' + sessionStorage.userId + '?access_token=' + sessionStorage.userToken;

function estilosinfo() {
	$('#info').removeClass();
	$('#info').addClass('alert alert-success');
}
function eliminarinfo() {
	setTimeout(function(){
        $('#info').html("");
        $('#info').removeClass('alert alert-success');}, 2500);
}

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

/* Vaciar los campos, después de seleccionar el botón enviar */
function reiniciarElementos() {
	$("#nombre").val("");
}

function estilosAlerta() {
	$('#info').removeClass();
	$('#info').addClass('alert alert-danger');
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

/* Función para insertar proveedores */
function insertarProveedor(datos,url) {
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: 'POST',
		url: url,
	}).done(function(respuesta) {
		if (typeof(respuesta.id) !== undefined) {
			estilosinfo();
			$('#info').html("Tipo de producto insertado");
			eliminarinfo();
			window.location.href = "../inicio.html";
			
		} else {
			estilosAlerta();
			$('#info').html("Error, tipo de producto no insertado");
			eliminarAlerta();
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
		var destino = '/api/Proveedores?access_token=' + sessionStorage.userToken;
		insertarProveedor(datosEnvio, destino);
	}
		reiniciarElementos();
		eliminarAlerta();
}

$(document).ready(function() {
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